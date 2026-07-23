<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceValidation.ps1

Timestamp
22 July 2026 08:35

Work Package
PR-006F — Host State Singleton Refactor

Component
Operational Service Host

Purpose
Performs validation of Operational Services before lifecycle operations.
This module contains validation only and relies on the singleton-backed
host state provided by Host-State.ps1.

Dependencies
- Runtime-State.ps1
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Operational-Registry.psm1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Uses only the public Operational Registry API
==============================================================================
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

function Test-JDHostBootstrapping
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    return (
        $state.Initialised -and
        (
            $state.Bootstrapping -or
            $state.Starting
        )
    )
}
{
    [CmdletBinding()]
    param()

    #
    # Runtime state is now supplied by the singleton provider.
    #
    $state = Get-JDHostState

    Write-Host ""
    Write-Host "================ HOST VALIDATION ================" -ForegroundColor Yellow
    Write-Host ("Running      : {0}" -f $state.Running)
    Write-Host ("Initialised  : {0}" -f $state.Initialised)
    Write-Host ("Health       : {0}" -f $state.HealthState)
    Write-Host ("StartedAt    : {0}" -f $state.StartedAt)
    Write-Host ("Heartbeat    : {0}" -f $state.LastHeartbeat)
    Write-Host ("Object Hash  : {0}" -f ([System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($state)))
    Write-Host "=================================================" -ForegroundColor Yellow
    Write-Host ""

    #
# During startup the host is expected to be Initialised but not yet
# Running. Bootstrapping and Starting are valid transitional states.
#

if (-not $state.Running)
{
    if ($state.Bootstrapping -or $state.Starting)
    {
        Write-Verbose "Operational Service Host is currently bootstrapping."

        return
    }

    throw "Operational Service Host is not running."
}

    return
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

        return $true
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

    return $true
}

function Assert-JDHostInitialised
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if ($null -eq $state)
    {
        throw "Operational Service Host state has not been created."
    }

    if (-not $state.Initialised)
    {
        throw "Operational Service Host has not been initialised."
    }

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================