<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Stop-JDOperationalService.ps1

Timestamp
10 July 2026 11:25

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for stopping a registered Operational Service.

Dependencies
- Host-ServiceManager.ps1
- Host-ServiceLookup.ps1
- Host-ServiceValidation.ps1

Notes
- Public module.
- Exported by Operational-ServiceHost.psm1.
==============================================================================#
#>

Set-StrictMode -Version Latest

function Stop-JDOperationalService
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

    $service = Stop-JDHostService `
        -Name $Name

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Operational Service [{0}] stopped." -f $Name)

    return [PSCustomObject]@{

        Name       = $service.Name

        State      = $service.RuntimeStatus.State

        Health     = $service.RuntimeStatus.Health

        Enabled    = $service.RuntimeStatus.Enabled

        Stopped    = ($service.RuntimeStatus.State -eq "STOPPED")

        Timestamp  = Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================