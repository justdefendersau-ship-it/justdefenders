#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-Registration.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Registration
#
# Purpose:
#   Registers managed services with the Operational Host and
#   initialises canonical runtime state.
#

Set-StrictMode -Version Latest

function Test-JDManagedServiceRegistration {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return (Test-JDManagedServiceState -Name $Name)
}

function Get-JDManagedServiceRegistration {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return Get-JDManagedServiceState -Name $Name
}

function Register-JDManagedService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [hashtable]$Definition
    )

    if (Test-JDManagedServiceRegistration -Name $Name) {
        throw "Managed service '$Name' is already registered."
    }

    foreach($required in 'StartupCommand','StopCommand'){
        if(-not $Definition.ContainsKey($required)){
            throw "Managed service '$Name' is missing required property '$required'."
        }
    }

    if (Get-Command Register-JDOperationalHostService -ErrorAction SilentlyContinue)
{
    $registration =
        if ($Definition -is [pscustomobject])
        {
            $Definition
        }
        else
        {
            [pscustomobject]$Definition
        }

    Register-JDOperationalHostService `
        -Registration $registration
}

    $state = Set-JDManagedServiceState `
        -Name $Name `
        -RegistrationState 'Registered' `
        -RuntimeState 'Registered' `
        -HealthState 'Unknown' `
        -Metadata $Definition

    [pscustomobject]@{
        Name              = $Name
        RegistrationState = 'Registered'
        RegisteredAt      = Get-Date
        Runtime           = $state
    }
}

function Unregister-JDManagedService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if (-not (Test-JDManagedServiceRegistration -Name $Name)) {
        return $false
    }

    if (Get-Command Unregister-JDOperationalHostService -ErrorAction SilentlyContinue) {
        Unregister-JDOperationalHostService -Name $Name
    }

    Remove-JDManagedServiceState -Name $Name | Out-Null

    return $true
}
