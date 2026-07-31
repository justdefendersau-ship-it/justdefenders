<#
JustDefenders® Engineering Library
Engineering Package : PR-012
Component           : Platform Public API
File                : Initialize-JDPlatform.ps1
Timestamp           : 1 August 2026, 08:15

Purpose
-------
Initialises the JustDefenders Platform by validating the runtime,
starting the Operational Host and returning platform status.
#>

Set-StrictMode -Version Latest

function Initialize-JDPlatform {
    [CmdletBinding()]
    param(
        [switch]$Force
    )

    $required = @(
        'Start-JDOperationalHost',
        'Get-JDOperationalHostStatus'
    )

    foreach($fn in $required){
        if(-not (Get-Command $fn -ErrorAction SilentlyContinue)){
            throw "Required function '$fn' is unavailable."
        }
    }

    $hostStatus = Get-JDOperationalHostStatus

    if(-not $hostStatus -or $Force){
        Start-JDOperationalHost | Out-Null
        $hostStatus = Get-JDOperationalHostStatus
    }

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr012'
        Status          = 'Ready'
        InitialisedAt   = Get-Date
        OperationalHost = $hostStatus
    }
}
