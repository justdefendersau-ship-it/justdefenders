<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalServiceHealth.ps1

Timestamp
10 July 2026 11:35

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for retrieving the health and runtime status of a
registered Operational Service.

Dependencies
- Host-Health.ps1
- Host-ServiceLookup.ps1
- Host-ServiceValidation.ps1

Notes
- Public module.
- Exported by Operational-ServiceHost.psm1.
==============================================================================#
#>

Set-StrictMode -Version Latest

function Get-JDOperationalServiceHealth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    $service = Get-JDHostRegisteredService `
        -Name $Name

    $health = Get-JDHostServiceHealth `
        -Name $Name

    [PSCustomObject]@{

        Name =
            $service.Name

        State =
            $service.RuntimeStatus.State

        Health =
            $health.Health

        Enabled =
            $service.RuntimeStatus.Enabled

        RegisteredAt =
            $service.RegisteredAt

        UpdatedAt =
            $service.UpdatedAt

        CheckedAt =
            $health.CheckedAt

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================