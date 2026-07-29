<#
==============================================================================
 JustDefenders ©

 File
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Lifecycle.ps1

 Timestamp
 09 July 2026 16:35

 Work Package
 WP-S001-03

 Component
 Operational Service Host

 Purpose
 Internal lifecycle engine responsible for starting, stopping and reporting
 runtime state for the Operational Service Host.

 NOTE
 This file is PRIVATE.
 It is dot-sourced by Operational-ServiceHost.psm1.
==============================================================================
#>


Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE HOST
# ============================================================================

function Initialize-JDHost
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if($state.Initialised)
    {
        return $state
    }

    Initialize-JDOperationalRegistry | Out-Null

    $state.Initialised = $true
    $state.HealthState = "HEALTHY"

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Host initialised."

    return $state
}

# ============================================================================
# START HOST
# ============================================================================

function Start-JDHost
{
    [CmdletBinding()]
    param()

    $state = Initialize-JDHost

    if($state.Running)
    {
        return $state
    }

    $state.Starting = $true

    $state.StartedAt = Get-Date

    $state.StoppedAt = $null

    $state.Running = $true

    $state.Starting = $false

    $state.Statistics.HostStarts++

    Update-JDHostHeartbeat

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host started."

    return $state
}

# ============================================================================
# STOP HOST
# ============================================================================

function Stop-JDHost
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if(-not $state.Running)
    {
        return $state
    }

    $state.Stopping = $true

    $state.Running = $false

    $state.StoppedAt = Get-Date

    $state.Stopping = $false

    $state.Statistics.HostStops++

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host stopped."

    return $state
}

# ============================================================================
# HOST STATUS
# ============================================================================

function Get-JDHostStatus
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    $services = Get-JDOperationalServices

    $state.Statistics.ManagedServices =
        @($services).Count

    [pscustomobject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        WorkPackage =
            $state.WorkPackage

        Running =
            $state.Running

        Initialised =
            $state.Initialised

        Health =
            $state.HealthState

        StartedAt =
            $state.StartedAt

        StoppedAt =
            $state.StoppedAt

        LastHeartbeat =
            $state.LastHeartbeat

        ManagedServices =
            $state.Statistics.ManagedServices
    }
}

# ============================================================================
# RESTART HOST
# ============================================================================

function Restart-JDHost
{
    [CmdletBinding()]
    param()

    Stop-JDHost | Out-Null

    $state = Start-JDHost

    $state.Statistics.Restarts++

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host restarted."

    return $state
}