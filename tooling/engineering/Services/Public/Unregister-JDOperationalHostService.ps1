<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Unregister-JDOperationalHostService.ps1

Timestamp
10 July 2026 12:00

Work Package
WP-S001-03 — Operational Service Host

Component
Public Host Registration API

Purpose
Removes an Operational Service from the Operational Service Host.

Consumers interact only with the Host Runtime. The Operational Registry remains
an internal implementation detail.

Dependencies
- Host-ServiceLookup.ps1
- Host-ServiceValidation.ps1
- Host-State.ps1
- Operational-Registry.psm1

==============================================================================
#>

Set-StrictMode -Version Latest

function Unregister-JDOperationalHostService
{
    [CmdletBinding(SupportsShouldProcess)]
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
    # Remove Service
    # ------------------------------------------------------------------------

    if($PSCmdlet.ShouldProcess($Name,"Unregister Operational Service"))
    {
        $removed =
            Unregister-JDOperationalService `
                -Name $Name

        Update-JDHostManagedServiceCount | Out-Null

        Write-JDEngineeringLog `
            -Level Information `
            -Message ("Operational Host unregistered service [{0}]." -f $Name)

        return [PSCustomObject]@{

            Success =
                [bool]$removed

            Name =
                $Name

            ManagedServices =
                Get-JDHostRegisteredServiceCount

            Timestamp =
                Get-Date

        }
    }
}

# ============================================================================
# END OF FILE
# ============================================================================