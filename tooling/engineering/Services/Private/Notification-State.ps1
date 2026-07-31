<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-1 Notification-State
Timestamp: 1 August 2026, 06:16

Engineering Fixes
-----------------
- StrictMode-safe runtime initialisation.
- Removed Export-ModuleMember from private module.
- Preserved runtime API.
#>


<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
Runtime Component: RT-1
File: tooling\engineering\Services\Private\Notification-State.ps1
Timestamp: 31 July 2026, 21:55

Purpose:
    Maintains the in-memory runtime state for the Notification managed
    service. This module is the canonical state store used by the
    Notification runtime components.
#>

Set-StrictMode -Version Latest

if (-not (Get-Variable -Name JDNotificationRuntime -Scope Script -ErrorAction SilentlyContinue)) {
    $script:JDNotificationRuntime = [ordered]@{
        Service       = 'Notification'
        Initialised   = $false
        Running       = $false
        Healthy       = $true
        Version       = '1.0.0'
        StartedAt     = $null
        LastHeartbeat = $null
        QueueDepth    = 0
        Notifications = 0
        Errors        = 0
        Lock          = New-Object object
        Context       = @{}
    }
}

function Get-JDNotificationRuntimeState {
    [CmdletBinding()]
    param()

    return [pscustomobject]$script:JDNotificationRuntime
}

function Initialize-JDNotificationRuntimeState {
    [CmdletBinding()]
    param()

    [System.Threading.Monitor]::Enter($script:JDNotificationRuntime.Lock)
    try {
        $script:JDNotificationRuntime.Initialised = $true
        $script:JDNotificationRuntime.Running = $false
        $script:JDNotificationRuntime.Healthy = $true
        $script:JDNotificationRuntime.StartedAt = $null
        $script:JDNotificationRuntime.LastHeartbeat = Get-Date
        $script:JDNotificationRuntime.QueueDepth = 0
        $script:JDNotificationRuntime.Notifications = 0
        $script:JDNotificationRuntime.Errors = 0
        $script:JDNotificationRuntime.Context = @{}
    }
    finally {
        [System.Threading.Monitor]::Exit($script:JDNotificationRuntime.Lock)
    }

    if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
        Write-JDEngineeringLog -Level Information -Message "Notification runtime state initialised."
    }

    return Get-JDNotificationRuntimeState
}

function Set-JDNotificationRuntimeState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Property,

        [Parameter(Mandatory)]
        $Value
    )

    [System.Threading.Monitor]::Enter($script:JDNotificationRuntime.Lock)
    try {
        if (-not $script:JDNotificationRuntime.Contains($Property)) {
            throw "Unknown runtime property '$Property'."
        }

        $script:JDNotificationRuntime[$Property] = $Value
        $script:JDNotificationRuntime.LastHeartbeat = Get-Date
    }
    finally {
        [System.Threading.Monitor]::Exit($script:JDNotificationRuntime.Lock)
    }

    return Get-JDNotificationRuntimeState
}

function Reset-JDNotificationRuntimeState {
    [CmdletBinding()]
    param()

    $script:JDNotificationRuntime.Initialised = $false
    $script:JDNotificationRuntime.Running = $false
    $script:JDNotificationRuntime.QueueDepth = 0
    $script:JDNotificationRuntime.Notifications = 0
    $script:JDNotificationRuntime.Errors = 0
    $script:JDNotificationRuntime.Context = @{}

    return Get-JDNotificationRuntimeState
}

# Export-ModuleMember removed - private module is dot-sourced by Operational-ServiceHost.psm1