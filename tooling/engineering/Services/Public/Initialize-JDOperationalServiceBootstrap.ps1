<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-S001-04
Production Revision: PR-007B
Component          : Operational Service Bootstrap
Timestamp          : 22 July 2026, 10:45
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Initialize-JDOperationalServiceBootstrap.ps1

------------------------------------------------------------------------------
DESCRIPTION
------------------------------------------------------------------------------

Public entry point for the Operational Service Bootstrap Engine.

This wrapper exposes the bootstrap functionality as part of the public
Operational-ServiceHost API while delegating all implementation to the
private bootstrap engine.

==============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

function Initialize-JDOperationalServiceBootstrap
{
    [CmdletBinding()]
    param
    (
        [switch]
        $EnableDiscovery,

        [switch]
        $Force
    )

    Invoke-JDOperationalBootstrap `
        -EnableDiscovery:$EnableDiscovery `
        -Force:$Force
}

Export-ModuleMember `
    -Function Initialize-JDOperationalServiceBootstrap