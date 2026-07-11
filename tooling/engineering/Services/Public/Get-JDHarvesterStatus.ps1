<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDHarvesterStatus.ps1

Timestamp
11 July 2026 12:15

Work Package
WP-S003-06

Component
Public Harvester API

Purpose
Returns the current operational status of the JustDefenders Harvester Runtime.

Responsibilities

    • Expose the authoritative runtime summary.
    • Perform no runtime manipulation.
    • Delegate reporting to Harvester-State.

Dependencies

    • Harvester-State.ps1

Notes

    • Public module
    • Exported by Harvester-Runtime.psm1
    • Read-only wrapper

==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDHarvesterStatus
{
    [CmdletBinding()]
    param()

    #
    # Runtime Summary is owned by Harvester-State.ps1
    #

    return Get-JDHarvesterRuntimeSummary
}

# ============================================================================
# END OF FILE
# ============================================================================