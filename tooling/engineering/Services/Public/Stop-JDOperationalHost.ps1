<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Stop-JDOperationalHost.ps1

Timestamp
10 July 2026 11:10

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for stopping the Operational Service Host.

Dependencies
- Host-Lifecycle.ps1
- Host-Scheduler.ps1
- Host-ServiceManager.ps1

Notes
- Public module.
- Exported by Operational-ServiceHost.psm1.
==============================================================================#
#>

Set-StrictMode -Version Latest

function Stop-JDOperationalHost
{
    [CmdletBinding()]
    param()

    Stop-JDHostScheduler | Out-Null

    Stop-JDHostRunningServices | Out-Null

    Stop-JDHost | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host stopped."

    return Get-JDHostStatus
}

# ============================================================================
# END OF FILE
# ============================================================================