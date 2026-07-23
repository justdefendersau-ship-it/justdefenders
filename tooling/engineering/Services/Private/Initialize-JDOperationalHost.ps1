<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-S001-05
Production Revision: PR-008A
Component          : Operational Host Initialisation Compatibility Layer
Timestamp          : 22 July 2026, 11:30
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Initialize-JDOperationalHost.ps1

------------------------------------------------------------------------------
DESCRIPTION
------------------------------------------------------------------------------

Compatibility entry point for the Operational Host initialisation lifecycle.

The authoritative lifecycle implementation is Initialize-JDHost in
Host-Lifecycle.ps1.

This function preserves the public startup contract expected by
Start-JDOperationalHost without duplicating lifecycle logic.

==============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

function Initialize-JDOperationalHost
{
    [CmdletBinding()]
    param()

    Write-Verbose "Initialising Operational Host."

    return Initialize-JDHost
}