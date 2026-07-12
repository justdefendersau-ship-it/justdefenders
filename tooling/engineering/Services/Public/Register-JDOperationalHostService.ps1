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
    # Validate Host
    # ------------------------------------------------------------------------

    Assert-JDHostRunning

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
