# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPUserProfile.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPUserProfile {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$UserIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$DisplayName,

        [string]$PreferredName,

        [Parameter(Mandatory)]
        [ValidatePattern('^[^@\s]+@[^@\s]+\.[^@\s]+$')]
        [string]$EmailAddress,

        [string]$Avatar,

        [string]$TimeZone = 'UTC',

        [string]$Locale = 'en-AU',

        [hashtable]$NotificationPreferences = @{},

        [hashtable]$MeasurementPreferences = @{},

        [string]$PreferredVehicle,

        [object[]]$ClubMemberships = @()
    )

    $profile = [pscustomobject]@{
        PSTypeName = 'JPP.User.Profile'

        UserIdentifier = $UserIdentifier

        DisplayName = $DisplayName

        PreferredName =
            if ([string]::IsNullOrWhiteSpace($PreferredName)) {
                $DisplayName
            }
            else {
                $PreferredName
            }

        EmailAddress = $EmailAddress

        Avatar = $Avatar

        TimeZone = $TimeZone

        Locale = $Locale

        NotificationPreferences = [pscustomobject]$NotificationPreferences

        MeasurementPreferences = [pscustomobject]$MeasurementPreferences

        PreferredVehicle = $PreferredVehicle

        ClubMemberships = @($ClubMemberships)

        CreatedAt = Get-Date

        Success = $true
    }

    $profile
}

Export-ModuleMember -Function Invoke-JPPUserProfile