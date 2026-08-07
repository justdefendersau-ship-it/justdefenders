# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPGarageDomain.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPGarageDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$GarageIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$GarageName,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$OwnerUserIdentifier,

        [string]$DefaultVehicleIdentifier,

        [string[]]$RegisteredVehicles = @(),

        [hashtable]$GarageMetadata = @{},

        [datetime]$CreatedAt = (Get-Date)
    )

    $registeredVehicleReferences = @(
        $RegisteredVehicles |
            Sort-Object -Unique |
            ForEach-Object {
                [pscustomobject]@{
                    VehicleIdentifier = $_
                }
            }
    )

    if (-not [string]::IsNullOrWhiteSpace($DefaultVehicleIdentifier)) {
        if ($RegisteredVehicles -notcontains $DefaultVehicleIdentifier) {
            throw "DefaultVehicleIdentifier must reference a registered vehicle."
        }
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Garage.Domain'

        GarageIdentifier = $GarageIdentifier

        GarageName = $GarageName

        OwnerUserIdentifier = $OwnerUserIdentifier

        DefaultVehicleIdentifier = $DefaultVehicleIdentifier

        RegisteredVehicles = $registeredVehicleReferences

        GarageMetadata = [pscustomobject]$GarageMetadata

        CreatedAt = $CreatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPGarageDomain