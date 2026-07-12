<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceRuntimeState.ps1

Timestamp
12 July 2026 12:45

Work Package
WP-S004C-01 — Host Runtime State Manager

Component
Operational Service Host

Purpose

Provides runtime state management for registered Operational Services.

Responsibilities

    • Read RuntimeStatus
    • Update RuntimeStatus
    • Update lifecycle timestamps

Dependencies

    • Host-ServiceState.ps1
    • Host-ServiceLookup.ps1

Notes

    • Private implementation
    • Owns runtime state only
    • Does not modify the registry

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# GET RUNTIME STATE
# ============================================================================

function Get-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    if($null -eq $service.RuntimeStatus)
    {
        throw (
            "Operational Service '{0}' has no RuntimeStatus." -f
            $Name
        )
    }

    return $service.RuntimeStatus
}

# ============================================================================
# PART 1 CONTINUES
# ============================================================================

# ============================================================================
# SET RUNTIME STATE
# ============================================================================

function Set-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateSet(
            "REGISTERED",
            "STARTING",
            "RUNNING",
            "STOPPING",
            "STOPPED",
            "FAILED"
        )]
        [string]
        $State
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    if($null -eq $service.RuntimeStatus)
    {
        $service | Add-Member `
            -MemberType NoteProperty `
            -Name RuntimeStatus `
            -Value ([PSCustomObject]@{

                State           = "REGISTERED"
                Health          = "UNKNOWN"
                Enabled         = $true
                Running         = $false
                StartedAt       = $null
                StoppedAt       = $null
                LastHeartbeat   = $null

            })
    }

    $service.RuntimeStatus.State = $State

    switch ($State)
    {
        "RUNNING"
        {
            $service.RuntimeStatus.Running   = $true
            $service.RuntimeStatus.StartedAt = Get-Date
        }

        "STOPPED"
        {
            $service.RuntimeStatus.Running   = $false
            $service.RuntimeStatus.StoppedAt = Get-Date
        }

        default
        {
            # Preserve existing Running state.
        }
    }

    return $service.RuntimeStatus
}

# ============================================================================
# UPDATE RUNTIME TIMESTAMP
# ============================================================================

function Update-JDHostServiceTimestamp
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtime =
        Get-JDHostServiceState `
            -Name $Name

    $runtime.LastHeartbeat =
        Get-Date

    return $runtime.LastHeartbeat
}

# ============================================================================
# PART 2 CONTINUES
# ============================================================================

# ============================================================================
# VALIDATE RUNTIME STATE
# ============================================================================

function Assert-JDHostServiceRuntimeState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtime =
        Get-JDHostServiceState `
            -Name $Name

    foreach($property in @(
        "State",
        "Health",
        "Enabled",
        "Running",
        "StartedAt",
        "StoppedAt",
        "LastHeartbeat"
    ))
    {
        if(-not $runtime.PSObject.Properties[$property])
        {
            throw (
                "Runtime state contract violation. Missing property '{0}'." -f
                $property
            )
        }
    }

    return $true
}

# ============================================================================
# RESET RUNTIME STATE
# ============================================================================

function Reset-JDHostServiceRuntimeState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtime =
        Get-JDHostServiceState `
            -Name $Name

    $runtime.State         = "REGISTERED"
    $runtime.Health        = "UNKNOWN"
    $runtime.Running       = $false
    $runtime.StartedAt     = $null
    $runtime.StoppedAt     = $null
    $runtime.LastHeartbeat = $null

    return $runtime
}

# ============================================================================
# END OF FILE
# ============================================================================
