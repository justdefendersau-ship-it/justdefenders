# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPIdentityDomain.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPIdentityDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$UserIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$DisplayName,

        [Parameter(Mandatory)]
        [ValidatePattern('^[^@\s]+@[^@\s]+\.[^@\s]+$')]
        [string]$EmailAddress,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$OrganisationIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$OrganisationName,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$MembershipIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$MembershipType,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$RoleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RoleName,

        [Parameter()]
        [string[]]$Permissions = @(),

        [Parameter()]
        [object[]]$VehicleOwnership = @()
    )

    $createdAt = Get-Date

    $permissionObjects = foreach ($permission in ($Permissions | Sort-Object -Unique)) {
        [pscustomobject]@{
            PermissionName = $permission
        }
    }

    $ownershipObjects = foreach ($ownership in $VehicleOwnership) {

        if ($ownership -is [string]) {
            [pscustomobject]@{
                VehicleIdentifier = $ownership
                OwnershipType     = 'Owner'
            }
        }
        else {
            [pscustomobject]@{
                VehicleIdentifier = $ownership.VehicleIdentifier
                OwnershipType     = $ownership.OwnershipType
            }
        }
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Identity.Domain'

        User = [pscustomobject]@{
            UserIdentifier = $UserIdentifier
            DisplayName    = $DisplayName
            EmailAddress   = $EmailAddress
        }

        Organisation = [pscustomobject]@{
            OrganisationIdentifier = $OrganisationIdentifier
            OrganisationName       = $OrganisationName
        }

        Membership = [pscustomobject]@{
            MembershipIdentifier = $MembershipIdentifier
            MembershipType       = $MembershipType
        }

        Role = [pscustomobject]@{
            RoleIdentifier = $RoleIdentifier
            RoleName       = $RoleName
        }

        Permissions = @($permissionObjects)

        VehicleOwnership = @($ownershipObjects)

        CreatedAt = $createdAt
        Success   = $true
    }
}

Export-ModuleMember -Function Invoke-JPPIdentityDomain