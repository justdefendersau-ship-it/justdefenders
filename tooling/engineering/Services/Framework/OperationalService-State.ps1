<#
JustDefenders® Engineering Library
JD-FWK-001 Foundation Edition

File:
tooling\engineering\Services\Framework\OperationalService-State.ps1

WORK PACKAGE: WP-001
STATUS: IN PROGRESS
#>

Set-StrictMode -Version Latest

$script:OperationalServiceRegistry = @{}

function Initialize-JDOperationalServiceState {
    [CmdletBinding()]
    param()

    $script:OperationalServiceRegistry = @{}
}

Export-ModuleMember -Function Initialize-JDOperationalServiceState
