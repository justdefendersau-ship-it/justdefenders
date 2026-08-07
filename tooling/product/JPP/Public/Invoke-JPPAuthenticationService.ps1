# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPAuthenticationService.ps1
# Programme : PP-001
# WorkPack  : WP-001
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPAuthenticationService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet(
            'Supabase'
        )]
        [string]$AuthenticationProvider,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$UserIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[^@\s]+@[^@\s]+\.[^@\s]+$')]
        [string]$EmailAddress,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Authenticated',
            'Unauthenticated',
            'Pending',
            'Expired',
            'Failed'
        )]
        [string]$AuthenticationStatus,

        [string]$SessionIdentifier,

        [datetime]$AuthenticatedAt = (Get-Date),

        [datetime]$SessionExpiresAt,

        [hashtable]$SignInMetadata = @{},

        [hashtable]$SignOutMetadata = @{}
    )

    $session = [pscustomobject]@{
        SessionIdentifier = $SessionIdentifier
        AuthenticatedAt   = $AuthenticatedAt
        ExpiresAt         = $SessionExpiresAt
    }

    $provider = [pscustomobject]@{
        ProviderName = $AuthenticationProvider
        Version      = '1.0'
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Authentication.Service'

        UserAuthentication = [pscustomobject]@{
            UserIdentifier = $UserIdentifier
            EmailAddress   = $EmailAddress
        }

        SessionInformation = $session

        AuthenticationProvider = $provider

        AuthenticationStatus = $AuthenticationStatus

        SignInMetadata = [pscustomobject]$SignInMetadata

        SignOutMetadata = [pscustomobject]$SignOutMetadata

        AuthenticatedAt = $AuthenticatedAt

        Success = ($AuthenticationStatus -eq 'Authenticated')
    }
}

Export-ModuleMember -Function Invoke-JPPAuthenticationService