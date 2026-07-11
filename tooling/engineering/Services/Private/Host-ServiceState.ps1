<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceState.ps1

Timestamp
10 July 2026 12:00

Work Package
WP-S001-03a

Component
Operational Service Host

Purpose
Provides authoritative runtime state management for Operational Services.

This module owns service runtime state transitions but never performs service
execution. All persistence is delegated to the Operational Registry through
its public API.

Responsibilities

    • Read RuntimeStatus
    • Update RuntimeStatus
    • Preserve RuntimeStatus integrity
    • Update timestamps
    • Reset RuntimeStatus

Dependencies

    • Host-State.ps1
    • Host-ServiceLookup.ps1
    • Operational-Registry.psm1

Notes

    • Private module.
    • Dot-sourced by Operational-ServiceHost.psm1.
    • Never accesses Registry internals.
    • Uses only the Operational Registry public API.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# GET SERVICE RUNTIME STATE
# ============================================================================

function Get-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        return $null
    }

    return $service.RuntimeStatus
}

# ============================================================================
# INTERNAL RUNTIME STATUS UPDATE
# ============================================================================

function Update-JDHostRuntimeStatus
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [string]
        $State,

        [string]
        $Health,

        [Nullable[bool]]
        $Enabled
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw "Operational Service '$Name' is not registered."
    }

    $current = $service.RuntimeStatus

    $runtimeStatus = [PSCustomObject]@{

        State =
            $current.State

        Health =
            $current.Health

        Enabled =
            $current.Enabled

    }

    if($PSBoundParameters.ContainsKey("State"))
    {
        $runtimeStatus.State = $State
    }

    if($PSBoundParameters.ContainsKey("Health"))
    {
        $runtimeStatus.Health = $Health
    }

    if($PSBoundParameters.ContainsKey("Enabled"))
    {
        $runtimeStatus.Enabled = $Enabled
    }

    Update-JDOperationalService `
        -Name $Name `
        -Properties @{

            RuntimeStatus = $runtimeStatus

        } | Out-Null

    return Get-JDHostServiceState `
        -Name $Name
}

# ============================================================================
# SET SERVICE STATE
# ============================================================================

function Set-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $State
    )

    return Update-JDHostRuntimeStatus `
        -Name $Name `
        -State $State
}

# ============================================================================
# SET SERVICE HEALTH
# ============================================================================

function Set-JDHostServiceHealth
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateSet(
            "UNKNOWN",
            "HEALTHY",
            "DEGRADED",
            "FAILED"
        )]
        [string]
        $Health
    )

    return Update-JDHostRuntimeStatus `
        -Name $Name `
        -Health $Health
}

# ============================================================================
# ENABLE SERVICE
# ============================================================================

function Enable-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return Update-JDHostRuntimeStatus `
        -Name $Name `
        -Enabled $true
}

# ============================================================================
# DISABLE SERVICE
# ============================================================================

function Disable-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return Update-JDHostRuntimeStatus `
        -Name $Name `
        -Enabled $false
}

# ============================================================================
# TOUCH SERVICE
# ============================================================================

function Update-JDHostServiceTimestamp
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw "Operational Service '$Name' is not registered."
    }

    Update-JDOperationalService `
        -Name $Name `
        -Properties @{

            UpdatedAt = Get-Date

        } | Out-Null

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# RESET SERVICE STATE
# ============================================================================

function Reset-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtimeStatus = [PSCustomObject]@{

        State =
            "REGISTERED"

        Health =
            "UNKNOWN"

        Enabled =
            $true

    }

    Update-JDOperationalService `
        -Name $Name `
        -Properties @{

            RuntimeStatus = $runtimeStatus

        } | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    return Get-JDHostServiceState `
        -Name $Name
}

# ============================================================================
# GET COMPLETE SERVICE RECORD
# ============================================================================

function Get-JDHostServiceRecord
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# TEST SERVICE REGISTERED
# ============================================================================

function Test-JDHostServiceRegistered
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return [bool](
        Get-JDHostRegisteredService `
            -Name $Name
    )
}

# ============================================================================
# END OF FILE
# ============================================================================