<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalHostServices.ps1

Timestamp
10 July 2026 12:20

Work Package
WP-S001-03 — Operational Service Host

Component
Public Host Registration API

Purpose
Returns all Operational Services currently registered with the Operational
Service Host.

Consumers interact exclusively with the Host Runtime. The Operational Registry
remains a private implementation detail.

Dependencies
- Host-ServiceLookup.ps1
- Host-ServiceValidation.ps1
- Operational-Registry.psm1

==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDOperationalHostServices
{
    [CmdletBinding()]
    param()

    # ------------------------------------------------------------------------
    # Validate Host
    # ------------------------------------------------------------------------

    Assert-JDHostRunning

    # ------------------------------------------------------------------------
    # Retrieve Registered Services
    # ------------------------------------------------------------------------

    $services =
        Get-JDHostRegisteredServices

    # ------------------------------------------------------------------------
    # Return Empty Collection
    # ------------------------------------------------------------------------

    if($null -eq $services)
    {
        return @()
    }

    # ------------------------------------------------------------------------
    # Build Host-facing Collection
    # ------------------------------------------------------------------------

    $result = foreach($service in @($services))
    {
        [PSCustomObject]@{

            Name =
                $service.Name

            Registration =
                $service.Registration

            RuntimeState =
                $service.RuntimeStatus.State

            Health =
                $service.RuntimeStatus.Health

            Enabled =
                $service.RuntimeStatus.Enabled

            Instance =
                $service.Instance

            RegisteredAt =
                $service.RegisteredAt

            UpdatedAt =
                $service.UpdatedAt

        }
    }

    # ------------------------------------------------------------------------
    # Update Host Statistics
    # ------------------------------------------------------------------------

    Update-JDHostManagedServiceCount | Out-Null

    # ------------------------------------------------------------------------
    # Return Collection
    # ------------------------------------------------------------------------

    return @($result)
}

# ============================================================================
# END OF FILE
# ============================================================================