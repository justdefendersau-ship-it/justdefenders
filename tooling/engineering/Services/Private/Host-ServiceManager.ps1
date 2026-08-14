<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceManager.ps1

Timestamp
13 August 2026 21:23 (Sydney)

Work Package
WP-HARVEST-001 / PR-001

Component
Operational Service Host

Purpose
Implements lifecycle management for managed Operational Services and
coordinates execution of managed runtime commands.

Dependencies

- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Host-ServiceValidation.ps1
- Engineering-Common.psm1

Notes

- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Implements Managed Runtime Contract
- Preserves the established lifecycle and synchronisation behaviour.
- Engineering-Common logging is module-qualified to avoid nested module-scope
  command resolution failures.
==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# INVOKE MANAGED SERVICE COMMAND
# ============================================================================

function Invoke-JDHostServiceCommand
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [PSCustomObject]
        $Service,

        [Parameter(Mandatory)]
        [ValidateSet(
            "Start",
            "Stop",
            "Restart",
            "Pause",
            "Resume",
            "Status",
            "Health",
            "Metrics"
        )]
        [string]
        $Operation
    )

    # ------------------------------------------------------------------------
    # Resolve command property
    # ------------------------------------------------------------------------

    $property =
        "{0}Command" -f $Operation

    if(-not $Service.PSObject.Properties[$property])
    {
        throw (
            "Operational Service '{0}' does not expose '{1}'." -f
            $Service.Name,
            $property
        )
    }

    $commandName =
        $Service.$property

    if([string]::IsNullOrWhiteSpace($commandName))
    {
        throw (
            "Operational Service '{0}' has no '{1}' configured." -f
            $Service.Name,
            $property
        )
    }

    # ------------------------------------------------------------------------
    # Resolve command
    # ------------------------------------------------------------------------

    $command =
        Get-Command `
            -Name $commandName `
            -ErrorAction SilentlyContinue

    if($null -eq $command)
    {
        throw (
            "Managed Service command '{0}' could not be resolved." -f
            $commandName
        )
    }

    # ------------------------------------------------------------------------
    # Execute command
    # ------------------------------------------------------------------------

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Invoking managed service command '{0}' for [{1}]." -f
            $commandName,
            $Service.Name
        )

    return (& $commandName)
}

# ============================================================================
# START SERVICE
# ============================================================================

function Start-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceEnabled `
        -Name $Name

    Assert-JDHostServiceStopped `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    Invoke-JDHostServiceCommand `
        -Service $service `
        -Operation Start | Out-Null

    Sync-JDHostManagedService `
        -Name $Name | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service [{0}] started." -f
            $Name
        )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# STOP SERVICE
# ============================================================================

function Stop-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceRunning `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    Invoke-JDHostServiceCommand `
        -Service $service `
        -Operation Stop | Out-Null

    Sync-JDHostManagedService `
        -Name $Name | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service [{0}] stopped." -f
            $Name
        )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# RESTART SERVICE
# ============================================================================

function Restart-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    Invoke-JDHostServiceCommand `
        -Service $service `
        -Operation Restart | Out-Null

    Sync-JDHostManagedService `
        -Name $Name | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    $state =
        Get-JDHostState

    $state.Statistics.Restarts++

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service [{0}] restarted." -f
            $Name
        )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# START ALL ENABLED SERVICES
# ============================================================================

function Start-JDHostEnabledServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostEnabledServices)
    {
        if($service.RuntimeStatus.State -ne "RUNNING")
        {
            Start-JDHostService `
                -Name $service.Name | Out-Null
        }
    }

    Update-JDHostManagedServiceCount | Out-Null
}

# ============================================================================
# STOP ALL RUNNING SERVICES
# ============================================================================

function Stop-JDHostRunningServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostServicesByState `
        -State "RUNNING")
    {
        try
        {
            Stop-JDHostService `
                -Name $service.Name | Out-Null
        }
        catch
        {
            Engineering-Common\Write-JDEngineeringLog `
                -Level Error `
                -Message (
                    "Failed to stop Operational Service [{0}]. {1}" -f
                    $service.Name,
                    $_.Exception.Message
                )

            throw
        }
    }

    Update-JDHostManagedServiceCount | Out-Null
}

# ============================================================================
# SYNCHRONISE MANAGED SERVICE
# ============================================================================

function Sync-JDHostManagedService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostServiceExists `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    try
    {
        $status =
            Invoke-JDHostServiceCommand `
                -Service $service `
                -Operation Status
    }
    catch
    {
        return $service
    }

    if($null -eq $status)
    {
        return $service
    }

    if($status.PSObject.Properties["Running"])
    {
        if($status.Running)
        {
            Set-JDHostServiceState `
                -Name $Name `
                -State "RUNNING" | Out-Null
        }
        else
        {
            Set-JDHostServiceState `
                -Name $Name `
                -State "STOPPED" | Out-Null
        }

        Update-JDHostServiceTimestamp `
            -Name $Name | Out-Null
    }

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# SYNCHRONISE ALL MANAGED SERVICES
# ============================================================================

function Sync-JDHostManagedServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostRegisteredServices)
    {
        Sync-JDHostManagedService `
            -Name $service.Name | Out-Null
    }

    Update-JDHostManagedServiceCount | Out-Null
}

# ============================================================================
# END OF FILE
# ============================================================================
