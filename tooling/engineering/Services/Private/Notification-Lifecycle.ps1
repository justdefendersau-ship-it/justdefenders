<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-5 Notification-Lifecycle
Timestamp: 1 August 2026, 06:55

Engineering Fixes
-----------------
* StrictMode-safe lifecycle operations.
* Defensive dependency validation.
* Idempotent start/stop/restart.
* Safe shutdown sequence.
* Private module (no Export-ModuleMember).
#>

Set-StrictMode -Version Latest

function Start-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    if (-not (Get-Command Initialize-JDNotificationManager -ErrorAction SilentlyContinue)) {
        throw "Notification Manager is unavailable."
    }

    Initialize-JDNotificationManager
}

function Stop-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    if (Get-Command Stop-JDNotificationManager -ErrorAction SilentlyContinue) {
        Stop-JDNotificationManager | Out-Null
    }

    if (Get-Command Clear-JDNotificationQueue -ErrorAction SilentlyContinue) {
        Clear-JDNotificationQueue | Out-Null
    }

    if (Get-Command Reset-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {
        Reset-JDNotificationRuntimeState | Out-Null
    }

    [pscustomobject]@{
        Service = 'Notification'
        Status  = 'Stopped'
        Time    = Get-Date
    }
}

function Restart-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    Stop-JDNotificationLifecycle | Out-Null
    Start-JDNotificationLifecycle
}

function Invoke-JDNotificationHeartbeat {
    [CmdletBinding()]
    param()

    if (Get-Command Set-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {
        Set-JDNotificationRuntimeState -Property LastHeartbeat -Value (Get-Date) | Out-Null
    }

    Get-JDNotificationRuntimeState
}

function Close-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    Stop-JDNotificationLifecycle
}
