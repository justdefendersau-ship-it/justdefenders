<#
==============================================================================
JustDefenders ©
File:
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Stop-JDTimelineService.ps1

Timestamp:
13 August 2026 21:03 (Sydney)

Work Package:
WP-HARVEST-001 / PR-001
==============================================================================
#>

Set-StrictMode -Version Latest

function Stop-JDTimelineService {
    [CmdletBinding()]
    param()

    if ($null -eq (Get-Variable -Name JDTimelineRuntime -Scope Script -ErrorAction SilentlyContinue)) {
        $Script:JDTimelineRuntime = [ordered]@{
            State          = 'STOPPED'
            Running        = $false
            Health         = 'UNKNOWN'
            StartedAt      = $null
            StoppedAt      = Get-Date
            LastHeartbeat  = $null
            LastEventCount = 0
        }
    }
    else {
        $Script:JDTimelineRuntime.State = 'STOPPED'
        $Script:JDTimelineRuntime.Running = $false
        $Script:JDTimelineRuntime.Health = 'UNKNOWN'
        $Script:JDTimelineRuntime.StoppedAt = Get-Date
    }

    if (Get-Command Engineering-Common\Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
        Engineering-Common\Write-JDEngineeringLog `
            -Level Information `
            -Message 'Timeline service stopped.'
    }

    return [pscustomobject]$Script:JDTimelineRuntime
}

Export-ModuleMember -Function Stop-JDTimelineService
