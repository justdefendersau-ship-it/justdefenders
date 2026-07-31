<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-4 Notification-Manager
Timestamp: 1 August 2026, 06:45

Engineering Fixes
-----------------
* StrictMode-safe manager initialisation.
* Defensive dependency validation.
* Idempotent startup/shutdown.
* Private module (no Export-ModuleMember).
#>

Set-StrictMode -Version Latest

function Initialize-JDNotificationManager {
    [CmdletBinding()]
    param()

    foreach($fn in @(
        'Initialize-JDNotificationRuntimeState',
        'Initialize-JDNotificationQueue',
        'Set-JDNotificationRuntimeState'))
    {
        if(-not (Get-Command $fn -ErrorAction SilentlyContinue)){
            throw "Required runtime function '$fn' is unavailable."
        }
    }

    Initialize-JDNotificationRuntimeState | Out-Null
    Initialize-JDNotificationQueue | Out-Null

    Set-JDNotificationRuntimeState -Property Running -Value $true | Out-Null
    Set-JDNotificationRuntimeState -Property StartedAt -Value (Get-Date) | Out-Null
    Set-JDNotificationRuntimeState -Property LastHeartbeat -Value (Get-Date) | Out-Null

    Get-JDNotificationManagerStatus
}

function Invoke-JDNotificationManager {
    [CmdletBinding()]
    param([int]$BatchSize = 100)

    if(-not (Get-Command Invoke-JDNotificationDispatcher -ErrorAction SilentlyContinue)){
        throw "Notification dispatcher is unavailable."
    }

    Invoke-JDNotificationDispatcher -MaxItems $BatchSize
}

function Get-JDNotificationManagerStatus {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Runtime    = Get-JDNotificationRuntimeState
        Queue      = Get-JDNotificationQueue
        CheckedAt  = Get-Date
    }
}

function Stop-JDNotificationManager {
    [CmdletBinding()]
    param()

    Set-JDNotificationRuntimeState -Property Running -Value $false | Out-Null
    Set-JDNotificationRuntimeState -Property LastHeartbeat -Value (Get-Date) | Out-Null

    Get-JDNotificationManagerStatus
}
