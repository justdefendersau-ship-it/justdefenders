<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceValidation.ps1

Timestamp
10 July 2026 09:50

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Performs all validation of Operational Services before lifecycle operations.
This module ensures services exist, are enabled and are in a valid state
before execution. It contains no lifecycle logic.

Dependencies
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Operational-Registry.psm1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Uses only the public Operational Registry API
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# ASSERT SERVICE EXISTS
# ============================================================================

function Assert-JDHostServiceExists
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    if (-not (Test-JDHostServiceExists -Name $Name))
    {
        throw "Operational Service '$Name' is not registered."
    }

    return
}

# ============================================================================
# ASSERT SERVICE ENABLED
# ============================================================================

function Assert-JDHostServiceEnabled
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $service = Get-JDHostRegisteredService -Name $Name

    if (-not $service.RuntimeStatus.Enabled)
    {
        throw "Operational Service '$Name' is disabled."
    }

    return
}

# ============================================================================
# ASSERT HOST RUNNING
# ============================================================================

function Assert-JDHostRunning
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

Write-Host "Caller      : $($MyInvocation.InvocationName)"
Write-Host "Running     : $($state.Running)"
Write-Host "Initialised : $($state.Initialised)"
Write-Host "Hash        : $([Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($state))"
Write-Host "Module      : $($ExecutionContext.SessionState.Module.Name)"

    Write-Host ""
    Write-Host "================ HOST VALIDATION ================" -ForegroundColor Yellow
    Write-Host ("Running      : {0}" -f $state.Running)
    Write-Host ("Initialised  : {0}" -f $state.Initialised)
    Write-Host ("Health       : {0}" -f $state.HealthState)
    Write-Host ("StartedAt    : {0}" -f $state.StartedAt)
    Write-Host ("Object Hash  : {0}" -f ([System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($state)))
    Write-Host "=================================================" -ForegroundColor Yellow
    Write-Host ""

    if (-not $state.Running)
    {
        throw "Operational Service Host is not running."
    }
}

# ============================================================================
# ASSERT SERVICE STOPPED
# ============================================================================

function Assert-JDHostServiceStopped
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $runtime = Get-JDHostServiceState -Name $Name

    if ($runtime.State -eq "RUNNING")
    {
        throw "Operational Service '$Name' is already running."
    }

    return
}

# ============================================================================
# ASSERT SERVICE RUNNING
# ============================================================================

function Assert-JDHostServiceRunning
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $runtime = Get-JDHostServiceState -Name $Name

    if ($runtime.State -ne "RUNNING")
    {
        throw "Operational Service '$Name' is not running."
    }

    return
}

# ============================================================================
# TEST SERVICE READY
# ============================================================================

function Test-JDHostServiceReady
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    try
    {
        Assert-JDHostRunning

        Assert-JDHostServiceExists `
            -Name $Name

        Assert-JDHostServiceEnabled `
            -Name $Name

        return
    }
    catch
    {
        return $false
    }
}

# ============================================================================
# VALIDATE SERVICE
# ============================================================================

function Test-JDHostServiceValidation
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $service = Get-JDHostRegisteredService `
        -Name $Name

    if ($null -eq $service)
    {
        return $false
    }

    if ($null -eq $service.RuntimeStatus)
    {
        return $false
    }

    return
}

# ============================================================================
# END OF FILE
# ============================================================================