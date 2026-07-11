<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDOperationalService.ps1

Timestamp
10 July 2026 11:20

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Public entry point for starting a registered Operational Service.

Dependencies
- Host-ServiceManager.ps1
- Host-ServiceLookup.ps1
- Host-Validation.ps1

Notes
- Public module.
- Exported by Operational-ServiceHost.psm1.
==============================================================================#
#>

Set-StrictMode -Version Latest

function Start-JDOperationalService
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

    Assert-JDHostServiceEnabled `
        -Name $Name

    $service = Start-JDHostService `
        -Name $Name

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Operational Service [{0}] started." -f $Name)

    return [PSCustomObject]@{

        Name           = $service.Name

        State          = $service.RuntimeStatus.State

        Health         = $service.RuntimeStatus.Health

        Enabled        = $service.RuntimeStatus.Enabled

        Started        = ($service.RuntimeStatus.State -eq "RUNNING")

        Timestamp      = Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================