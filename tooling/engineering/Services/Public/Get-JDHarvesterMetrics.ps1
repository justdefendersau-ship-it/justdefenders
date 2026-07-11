<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDHarvesterMetrics.ps1

Timestamp
11 July 2026 13:50

Work Package
WP-S003-08

Component
Public Harvester API

Purpose
Returns the current operational metrics for the JustDefenders Harvester Runtime.

This is a thin public wrapper over the authoritative statistics maintained by
Harvester-State.ps1.

==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDHarvesterMetrics
{
    [CmdletBinding()]
    param()

    #
    # Statistics are owned by Harvester-State.ps1
    #

    return Get-JDHarvesterStatistics
}

# ============================================================================
# END OF FILE
# ============================================================================