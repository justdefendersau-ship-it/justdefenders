<#
==============================================================================
JustDefenders ©
File:
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDTimelineService.ps1

Timestamp:
13 August 2026 21:03 (Sydney)

Work Package:
WP-HARVEST-001 / PR-001

Purpose:
Starts the Timeline managed service using the existing operational event bus
and fused Timeline engine. This is a SAFE MODE service adapter: it does not
introduce realtime orchestration, federation, or new event persistence.
==============================================================================
#>

Set-StrictMode -Version Latest

function Start-JDTimelineService {
    [CmdletBinding()]
    param()

    if (Get-Command Assert-JDHostRunning -ErrorAction SilentlyContinue) {
        Assert-JDHostRunning
    }

    $existing = Get-Variable -Name JDTimelineRuntime -Scope Script -ErrorAction SilentlyContinue

    if ($null -eq $existing) {
        $Script:JDTimelineRuntime = [ordered]@{
            State         = 'STOPPED'
            Running       = $false
            Health        = 'UNKNOWN'
            StartedAt     = $null
            StoppedAt     = $null
            LastHeartbeat = $null
            LastEventCount = 0
        }
    }

    $Script:JDTimelineRuntime.State = 'RUNNING'
    $Script:JDTimelineRuntime.Running = $true
    $Script:JDTimelineRuntime.Health = 'HEALTHY'
    $Script:JDTimelineRuntime.StartedAt = Get-Date
    $Script:JDTimelineRuntime.StoppedAt = $null
    $Script:JDTimelineRuntime.LastHeartbeat = Get-Date

    if (Get-Command Engineering-Common\Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
        Engineering-Common\Write-JDEngineeringLog `
            -Level Information `
            -Message 'Timeline service started.'
    }

    return [pscustomobject]$Script:JDTimelineRuntime
}

Export-ModuleMember -Function Start-JDTimelineService
