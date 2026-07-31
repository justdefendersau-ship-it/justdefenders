<#
JustDefenders® Engineering Library
Engineering Package : PR-012
Component           : Platform Public API
File                : Stop-JDPlatform.ps1
Timestamp           : 1 August 2026, 08:45

Purpose
-------
Performs an orderly shutdown of the JustDefenders Platform by
stopping the Operational Host and returning final status.
#>

Set-StrictMode -Version Latest

function Stop-JDPlatform {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [switch]$Force
    )

    foreach($fn in @(
        'Stop-JDOperationalHost',
        'Get-JDOperationalHostStatus'
    )){
        if(-not (Get-Command $fn -ErrorAction SilentlyContinue)){
            throw "Required function '$fn' is unavailable."
        }
    }

    if($PSCmdlet.ShouldProcess("JustDefenders Platform","Stop")){
        Stop-JDOperationalHost | Out-Null
    }

    $status = Get-JDOperationalHostStatus

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr012'
        Status          = 'Stopped'
        StoppedAt       = Get-Date
        Forced          = [bool]$Force
        OperationalHost = $status
    }
}
