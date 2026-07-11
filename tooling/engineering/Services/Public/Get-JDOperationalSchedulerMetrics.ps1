<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalSchedulerMetrics.ps1

Timestamp
10 July 2026 17:50

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Public entry point for retrieving Operational Scheduler metrics.

This cmdlet exposes scheduler execution metrics through the Host public API.

Dependencies
- Host-Scheduler.ps1
- Host-ServiceValidation.ps1

Notes
- Public module
- Exported by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

function Get-JDOperationalSchedulerMetrics
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    return Get-JDHostSchedulerMetrics
}

# ============================================================================
# END OF FILE
# ============================================================================