<#
JustDefenders® Engineering Library
Engineering Package : PR-012
Component           : Platform Public API
File                : Get-JDPlatformMetadata.ps1
Timestamp           : 1 August 2026, 09:15

Purpose
-------
Returns engineering metadata describing the current Platform
Runtime composition and environment.
#>

Set-StrictMode -Version Latest

function Get-JDPlatformMetadata {
    [CmdletBinding()]
    param()

    $hostStatus = $null

    if (Get-Command Get-JDOperationalHostStatus -ErrorAction SilentlyContinue) {
        $hostStatus = Get-JDOperationalHostStatus
    }

    [pscustomobject]@{
        PlatformName      = 'JustDefenders'
        PlatformVersion   = '0.1.0-pr012'
        Runtime           = 'Platform-Runtime'
        RuntimeVersion    = 'PR-012'
        OperationalHost   = if($hostStatus){$hostStatus.Status}else{'Unavailable'}
        PowerShellVersion = $PSVersionTable.PSVersion.ToString()
        ComputerName      = $env:COMPUTERNAME
        UserName          = $env:USERNAME
        GeneratedAt       = Get-Date
    }
}
