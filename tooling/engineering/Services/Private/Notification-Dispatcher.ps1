<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-3 Notification-Dispatcher
Timestamp: 1 August 2026, 06:35

Engineering Fixes
-----------------
* StrictMode-safe dependency checks.
* Queue acquisition through Get-JDNotificationQueue.
* Defensive runtime updates.
* Private module - no Export-ModuleMember.
#>

Set-StrictMode -Version Latest

function Invoke-JDNotificationDispatcher {
    [CmdletBinding()]
    param(
        [int]$MaxItems = 100
    )

    if (-not (Get-Command Get-JDNotificationQueue -ErrorAction SilentlyContinue)) {
        throw "Notification queue runtime is unavailable."
    }

    $queue = Get-JDNotificationQueue
    $processed = 0
    $failed = 0

    while ($queue.Count -gt 0 -and $processed -lt $MaxItems) {

        $item = $queue.Dequeue()

        try {

            if (Get-Command Set-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {

                $runtime = Get-JDNotificationRuntimeState

                Set-JDNotificationRuntimeState `
                    -Property Notifications `
                    -Value ($runtime.Notifications + 1) | Out-Null

                Set-JDNotificationRuntimeState `
                    -Property LastHeartbeat `
                    -Value (Get-Date) | Out-Null
            }

            $processed++
        }
        catch {

            $failed++

            if (Get-Command Get-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {

                $runtime = Get-JDNotificationRuntimeState

                Set-JDNotificationRuntimeState `
                    -Property Errors `
                    -Value ($runtime.Errors + 1) | Out-Null
            }

            if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
                Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
            }
        }
    }

    [pscustomobject]@{
        Processed = $processed
        Failed    = $failed
        Remaining = $queue.Count
        Completed = Get-Date
    }
}

function Test-JDNotificationDispatcher {

    if (-not (Get-Command Get-JDNotificationRuntimeState -ErrorAction SilentlyContinue)) {
        throw "Notification runtime state is unavailable."
    }

    $runtime = Get-JDNotificationRuntimeState

    [pscustomobject]@{
        Healthy       = $runtime.Healthy
        Running       = $runtime.Running
        QueueDepth    = $runtime.QueueDepth
        LastHeartbeat = $runtime.LastHeartbeat
    }
}
