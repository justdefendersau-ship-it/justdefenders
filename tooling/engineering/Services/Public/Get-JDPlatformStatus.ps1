<#
JustDefenders® Engineering Library
PR-012A Platform API Corrections
#>
Set-StrictMode -Version Latest
function Get-JDPlatformStatus {
    [CmdletBinding()] param()
    $host = Get-JDOperationalHostStatus
    [pscustomobject]@{
        PlatformName    = 'JustDefenders'
        PlatformVersion = '0.1.0-pr012a'
        GeneratedAt     = Get-Date
        OperationalHost = $host
    }
}
