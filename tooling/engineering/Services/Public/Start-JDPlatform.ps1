<#
JustDefenders® Engineering Library
PR-012A Platform API Corrections
#>
Set-StrictMode -Version Latest
function Start-JDPlatform {
    [CmdletBinding()] param([switch]$Force)
    $platform = Initialize-JDPlatform -Force:$Force
    try { Start-JDOperationalHost | Out-Null } catch {}
    $host = Get-JDOperationalHostStatus
    [pscustomobject]@{
        PlatformVersion = $platform.PlatformVersion
        Status          = 'Running'
        StartedAt       = Get-Date
        OperationalHost = $host
    }
}
