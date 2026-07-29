#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-Health.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Health
#
# Purpose:
#   Executes managed service health callbacks and normalises results.
#

Set-StrictMode -Version Latest

function Invoke-JDManagedServiceHealth {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $registration = Get-JDManagedServiceRegistration -Name $Name
    $metadata = $registration.Metadata

    $result = [pscustomobject]@{
        Name            = $Name
        Healthy         = $false
        HealthState     = 'Unknown'
        CheckedAt       = Get-Date
        Details         = $null
        Exception       = $null
    }

    try {
        if ($metadata.ContainsKey('HealthCommand') -and $metadata.HealthCommand) {
            $callbackResult = & $metadata.HealthCommand

            if ($callbackResult -is [bool]) {
                $result.Healthy = $callbackResult
                $result.HealthState = if ($callbackResult) { 'Healthy' } else { 'Unhealthy' }
            }
            elseif ($callbackResult -is [psobject]) {
                $result = $callbackResult
            }
        }
        else {
            $result.Healthy = $true
            $result.HealthState = 'Unknown'
        }
    }
    catch {
        $result.Healthy = $false
        $result.HealthState = 'Failed'
        $result.Exception = $_.Exception.Message
    }

    Set-JDManagedServiceState `
        -Name $Name `
        -HealthState $result.HealthState | Out-Null

    return $result
}
