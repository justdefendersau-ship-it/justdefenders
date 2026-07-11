<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Health.ps1

Timestamp
10 July 2026 10:20

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Provides health monitoring, heartbeat management and runtime statistics for
the Operational Service Host and all managed Operational Services.

Dependencies
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# HOST HEARTBEAT
# ============================================================================

function Invoke-JDHostHeartbeat
{
    [CmdletBinding()]
    param()

    Update-JDHostHeartbeat

    $state = Get-JDHostState

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Host heartbeat updated."

    return $state.LastHeartbeat
}

# ============================================================================
# HOST HEALTH CHECK
# ============================================================================

function Test-JDHostHealth
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if (-not $state.Running)
    {
        Update-JDHostHealth `
            -Health "FAILED"

        return $false
    }

    Update-JDHostHealth `
        -Health "HEALTHY"

    Invoke-JDHostHeartbeat | Out-Null

    return $true
}

# ============================================================================
# SERVICE HEALTH
# ============================================================================

function Get-JDHostServiceHealth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostServiceExists `
        -Name $Name

    $runtime = Get-JDHostServiceState `
        -Name $Name

    [pscustomobject]@{

        Name        = $Name

        State       = $runtime.State

        Health      = $runtime.Health

        Enabled     = $runtime.Enabled

        CheckedAt   = Get-Date

    }
}

# ============================================================================
# ALL SERVICE HEALTH
# ============================================================================

function Get-JDHostServicesHealth
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostRegisteredServices)
    {
        Get-JDHostServiceHealth `
            -Name $service.Name
    }
}

# ============================================================================
# HOST STATISTICS
# ============================================================================

function Get-JDHostStatistics
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    Update-JDHostManagedServiceCount | Out-Null

    [pscustomobject]@{

        HostStarts =
            $state.Statistics.HostStarts

        HostStops =
            $state.Statistics.HostStops

        Restarts =
            $state.Statistics.Restarts

        HealthChecks =
            $state.Statistics.HealthChecks

        RecoveryEvents =
            $state.Statistics.RecoveryEvents

        ManagedServices =
            $state.Statistics.ManagedServices

        LastHeartbeat =
            $state.LastHeartbeat

        LastHealthCheck =
            $state.LastHealthCheck

    }
}

# ============================================================================
# RESET HEALTH
# ============================================================================

function Reset-JDHostHealth
{
    [CmdletBinding()]
    param()

    Update-JDHostHealth `
        -Health "UNKNOWN"

    $state = Get-JDHostState

    $state.LastHeartbeat = $null

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================