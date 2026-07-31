<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-2 Notification-Queue
Timestamp: 1 August 2026, 06:25

Engineering Fixes
-----------------
* StrictMode-safe queue initialisation.
* Removed Export-ModuleMember from private module.
* Queue created only after existence check.
#>

Set-StrictMode -Version Latest

if (-not (Get-Variable -Name JDNotificationQueue -Scope Script -ErrorAction SilentlyContinue))
{
    $script:JDNotificationQueue = [System.Collections.Queue]::Synchronized(
        (New-Object System.Collections.Queue)
    )
}

function Get-JDNotificationQueue
{
    if (-not (Get-Variable -Name JDNotificationQueue -Scope Script -ErrorAction SilentlyContinue))
    {
        throw "Notification queue has not been initialised."
    }

    return $script:JDNotificationQueue
}

function Initialize-JDNotificationQueue
{
    if (-not (Get-Variable -Name JDNotificationQueue -Scope Script -ErrorAction SilentlyContinue))
    {
        $script:JDNotificationQueue = [System.Collections.Queue]::Synchronized(
            (New-Object System.Collections.Queue)
        )
    }

    while($script:JDNotificationQueue.Count -gt 0)
    {
        $null = $script:JDNotificationQueue.Dequeue()
    }

    if (Get-Command Set-JDNotificationRuntimeState -ErrorAction SilentlyContinue)
    {
        Set-JDNotificationRuntimeState -Property QueueDepth -Value 0 | Out-Null
    }

    return $script:JDNotificationQueue
}
