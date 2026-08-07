# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleManagement.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleManagement {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Register Vehicle',
            'Update Vehicle',
            'Archive Vehicle',
            'Restore Vehicle',
            'Remove Vehicle',
            'Select Default Vehicle'
        )]
        [string]$ManagementOperation,

        [Parameter(Mandatory)]
        [ValidateSet(
            'SUCCESS',
            'FAILED',
            'PENDING',
            'BLOCKED'
        )]
        [string]$OperationStatus,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$OperationSummary,

        [hashtable]$OperationMetadata = @{},

        [datetime]$ManagedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.Management'

        VehicleIdentifier = $VehicleIdentifier

        ManagementOperation = $ManagementOperation

        OperationStatus = $OperationStatus

        OperationSummary = $OperationSummary

        OperationMetadata = [pscustomobject]$OperationMetadata

        ManagedAt = $ManagedAt

        Success = ($OperationStatus -eq 'SUCCESS')
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleManagement