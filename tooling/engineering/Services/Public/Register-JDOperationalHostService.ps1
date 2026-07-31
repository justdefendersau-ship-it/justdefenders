<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Register-JDOperationalHostService.ps1

Timestamp
10 July 2026 12:00

Work Package
WP-S001-03 — Operational Service Host

Component
Public Host Registration API

Purpose
Registers an Operational Service with the Operational Service Host.

This is the ONLY supported public entry point for service registration.
Consumers must never call the Operational Registry directly.

The Host Runtime validates the request before delegating registration to the
Operational Registry.

Dependencies
- Host-ServiceValidation.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Operational-Registry.psm1

==============================================================================
#>

Set-StrictMode -Version Latest

function Register-JDOperationalHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [pscustomobject]
        $Registration
    )

    # ------------------------------------------------------------------------
# ------------------------------------------------------------------------
# Validate Host
#
# Bootstrap occurs before the Operational Host transitions to Running.
# During bootstrap we only require that the host has been initialised.
# Runtime registrations still require a running host.
# ------------------------------------------------------------------------

$hostState = Get-JDHostState

Write-Host ""
Write-Host "===== HOST STATE BEFORE GUARD ====="
$hostState | Format-List Initialised, Running, Bootstrapping, Starting
Write-Host "==================================="
Write-Host ""

if (-not $hostState.Initialised)
{
    throw "Operational Service Host has not been initialised."
}

#
# Lifecycle-aware validation.
#
# During bootstrap the host is intentionally not yet Running, so
# registrations are permitted while Bootstrapping or Starting.
#
# Once bootstrap has completed, all subsequent registrations require
# a running Operational Host.
#

$bootstrapActive =
    ($hostState.Bootstrapping -eq $true) -or
    ($hostState.Starting -eq $true)

if (-not $bootstrapActive)
{
    Assert-JDHostRunning
}

    if([string]::IsNullOrWhiteSpace($Registration.Name))
    {
        throw "Registration.Name is required."
    }

    # ------------------------------------------------------------------------
    # Prevent duplicate registrations
    # ------------------------------------------------------------------------

    if(Test-JDHostServiceExists -Name $Registration.Name)
    {
        throw "Operational Service '$($Registration.Name)' is already registered."
    }

    # ------------------------------------------------------------------------
    # Delegate to Operational Registry
    # ------------------------------------------------------------------------

    $service =
        Register-JDOperationalService `
            -Registration $Registration

    # ------------------------------------------------------------------------
    # Update Host Statistics
    # ------------------------------------------------------------------------

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Operational Host registered service [{0}]." -f $Registration.Name)

    # ------------------------------------------------------------------------
    # Return Host-facing object
    # ------------------------------------------------------------------------

    [PSCustomObject]@{

        Name =
            $service.Name

        State =
            $service.RuntimeStatus.State

        Health =
            $service.RuntimeStatus.Health

        Enabled =
            $service.RuntimeStatus.Enabled

        RegisteredAt =
            $service.RegisteredAt

        UpdatedAt =
            $service.UpdatedAt

        ManagedServices =
            (Get-JDHostRegisteredServiceCount)

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================
