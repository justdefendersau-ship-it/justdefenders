<#
JustDefenders® Engineering Library
PR-012A Platform API Corrections
#>
Set-StrictMode -Version Latest
function Restart-JDPlatform {
    [CmdletBinding(SupportsShouldProcess)]
    param([switch]$Force)

    if(-not $PSCmdlet.ShouldProcess("JustDefenders Platform","Restart")){
        return
    }

    Stop-JDPlatform -Force:$Force | Out-Null
    Start-Sleep -Seconds 1
    $platform = Start-JDPlatform -Force:$Force

    [pscustomobject]@{
        PlatformVersion = $platform.PlatformVersion
        Status          = 'Restarted'
        RestartedAt     = Get-Date
        OperationalHost = $platform.OperationalHost
    }
}
