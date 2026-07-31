<#
JustDefenders® Engineering Library
Engineering Package : PR-012
Component           : Platform Public API
File                : Platform-Control.ps1
Timestamp           : 1 August 2026, 08:35

Purpose
-------
Provides a unified control interface for Platform lifecycle
operations and exposes convenience wrappers for automation.
#>

Set-StrictMode -Version Latest

function Invoke-JDPlatformControl {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet('Initialize','Start','Stop','Restart','Status')]
        [string]$Action
    )

    switch ($Action) {

        'Initialize' {
            return Initialize-JDPlatform
        }

        'Start' {
            return Start-JDPlatform
        }

        'Stop' {
            return Stop-JDPlatform
        }

        'Restart' {
            return Restart-JDPlatform
        }

        'Status' {
            return Get-JDPlatformStatus
        }

        default {
            throw "Unsupported platform action '$Action'."
        }
    }
}

function Test-JDPlatformControl {
    [CmdletBinding()]
    param()

    $required = @(
        'Initialize-JDPlatform',
        'Start-JDPlatform',
        'Stop-JDPlatform',
        'Restart-JDPlatform',
        'Get-JDPlatformStatus'
    )

    $missing = @()

    foreach($fn in $required){
        if(-not (Get-Command $fn -ErrorAction SilentlyContinue)){
            $missing += $fn
        }
    }

    [pscustomobject]@{
        Healthy          = ($missing.Count -eq 0)
        MissingFunctions = $missing
        CheckedAt        = Get-Date
    }
}
