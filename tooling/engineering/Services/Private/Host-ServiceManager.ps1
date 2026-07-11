<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceManager.ps1

Timestamp
10 July 2026 10:05

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Implements the lifecycle management of registered Operational Services.
This module coordinates validation, state transitions and service execution
through the Operational Registry public API.

Dependencies
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Host-ServiceValidation.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# START SERVICE
# ============================================================================

function Start-JDHostService
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceEnabled `
        -Name $Name

    Assert-JDHostServiceStopped `
        -Name $Name

    Set-JDHostServiceState `
        -Name $Name `
        -State "RUNNING" | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service [$Name] started."

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# STOP SERVICE
# ============================================================================

function Stop-JDHostService
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceRunning `
        -Name $Name

    Set-JDHostServiceState `
        -Name $Name `
        -State "STOPPED" | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service [$Name] stopped."

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# RESTART SERVICE
# ============================================================================

function Restart-JDHostService
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if ((Get-JDHostServiceState -Name $Name).State -eq "RUNNING")
    {
        Stop-JDHostService `
            -Name $Name | Out-Null
    }

    Start-JDHostService `
        -Name $Name | Out-Null

    $state = Get-JDHostState

    $state.Statistics.Restarts++

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service [$Name] restarted."

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
        Stop-JDHostService `
            -Name $service.Name | Out-Null
    }
}

# ============================================================================
# END OF FILE
# ============================================================================