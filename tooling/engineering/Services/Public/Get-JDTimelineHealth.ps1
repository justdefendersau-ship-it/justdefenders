<#
==============================================================================
JustDefenders ©
File:
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDTimelineHealth.ps1

Timestamp:
13 August 2026 21:03 (Sydney)

Work Package:
WP-HARVEST-001 / PR-001
==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDTimelineHealth {
    [CmdletBinding()]
    param()

    if ($null -eq (Get-Variable -Name JDTimelineRuntime -Scope Script -ErrorAction SilentlyContinue)) {
        $Script:JDTimelineRuntime = [ordered]@{
            State          = 'STOPPED'
            Running        = $false
            Health         = 'UNKNOWN'
            StartedAt      = $null
            StoppedAt      = $null
            LastHeartbeat  = $null
            LastEventCount = 0
        }
    }

    $eventCount = 0

    if (Get-Command buildFusedTimeline -ErrorAction SilentlyContinue) {
        try {
            $eventCount = @(
                buildFusedTimeline
            ).Count
        }
        catch {
            $eventCount = 0
        }
    }

    $Script:JDTimelineRuntime.LastEventCount = $eventCount

    if ($Script:JDTimelineRuntime.Running) {
        $Script:JDTimelineRuntime.Health = 'HEALTHY'
        $Script:JDTimelineRuntime.LastHeartbeat = Get-Date
    }

    return [pscustomobject]@{
        Name           = 'Timeline'
        Version        = '1.0.0'
        State          = $Script:JDTimelineRuntime.State
        Running        = $Script:JDTimelineRuntime.Running
        Health         = $Script:JDTimelineRuntime.Health
        StartedAt      = $Script:JDTimelineRuntime.StartedAt
        StoppedAt      = $Script:JDTimelineRuntime.StoppedAt
        LastHeartbeat  = $Script:JDTimelineRuntime.LastHeartbeat
        EventCount     = $eventCount
        SafeMode       = $true
    }
}

Export-ModuleMember -Function Get-JDTimelineHealth
