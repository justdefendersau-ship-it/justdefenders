<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDOperationalHost.ps1

Timestamp
10 July 2026 11:05

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for starting the Operational Service Host.

Dependencies
- Host-Lifecycle.ps1
- Host-Scheduler.ps1

Notes
- Public module.
- Exported by Operational-ServiceHost.psm1.
==============================================================================#
#>

Set-StrictMode -Version Latest

function Start-JDOperationalHost
{
    [CmdletBinding()]
    param()

    $host = Start-JDHost

    Start-JDHostScheduler | Out-Null

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host started."

    return Get-JDHostStatus
}

# ============================================================================
# END OF FILE
# ============================================================================