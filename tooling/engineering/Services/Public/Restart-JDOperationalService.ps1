<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Restart-JDOperationalService.ps1

Timestamp
10 July 2026 11:30

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for restarting a registered Operational Service.

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

function Restart-JDOperationalService
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

    $service = Restart-JDHostService `
        -Name $Name

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Operational Service [{0}] restarted." -f $Name)

    return [PSCustomObject]@{

        Name              = $service.Name

        State             = $service.RuntimeStatus.State

        Health            = $service.RuntimeStatus.Health

        Enabled           = $service.RuntimeStatus.Enabled

        RestartSuccessful = ($service.RuntimeStatus.State -eq "RUNNING")

        Timestamp         = Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================