<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalHostService.ps1

Timestamp
10 July 2026 12:10

Work Package
WP-S001-03 — Operational Service Host

Component
Public Host Registration API

Purpose
Returns a single Operational Service registered with the Operational Service
Host.

Consumers interact only with the Host Runtime. The Operational Registry remains
a private implementation detail.

Dependencies
- Host-ServiceLookup.ps1
- Host-ServiceValidation.ps1
- Operational-Registry.psm1

==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDOperationalHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    # ------------------------------------------------------------------------
    # Validate Host
    # ------------------------------------------------------------------------

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    # ------------------------------------------------------------------------
    # Retrieve Service
    # ------------------------------------------------------------------------

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    # ------------------------------------------------------------------------
    # Return Host-facing Object
    # ------------------------------------------------------------------------

    [PSCustomObject]@{

        Name =
            $service.Name

        Registration =
            $service.Registration

        RuntimeStatus =
            $service.RuntimeStatus

        Statistics =
            $service.Statistics

        Instance =
            $service.Instance

        RegisteredAt =
            $service.RegisteredAt

        UpdatedAt =
            $service.UpdatedAt

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================