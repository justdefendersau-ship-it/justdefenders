#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-Lifecycle.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Lifecycle
#
# Purpose:
#   Provides the shared lifecycle implementation for all managed services.
#

Set-StrictMode -Version Latest

function Invoke-JDManagedServiceStart {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    $service = Get-JDManagedServiceRegistration -Name $Name
    $meta = $service.Metadata

    Set-JDManagedServiceState -Name $Name -RuntimeState Starting | Out-Null

    try {
        if ($meta.StartupCommand) {
            & $meta.StartupCommand
        }

        Set-JDManagedServiceState -Name $Name -RuntimeState Running | Out-Null
    }
    catch {
        Set-JDManagedServiceState -Name $Name -RuntimeState Failed | Out-Null
        throw
    }

    return Get-JDManagedServiceState -Name $Name
}

function Invoke-JDManagedServiceStop {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    $service = Get-JDManagedServiceRegistration -Name $Name
    $meta = $service.Metadata

    Set-JDManagedServiceState -Name $Name -RuntimeState Stopping | Out-Null

    try {
        if ($meta.StopCommand) {
            & $meta.StopCommand
        }

        Set-JDManagedServiceState -Name $Name -RuntimeState Stopped | Out-Null
    }
    catch {
        Set-JDManagedServiceState -Name $Name -RuntimeState Failed | Out-Null
        throw
    }

    return Get-JDManagedServiceState -Name $Name
}

function Invoke-JDManagedServiceRestart {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    Invoke-JDManagedServiceStop -Name $Name | Out-Null
    return Invoke-JDManagedServiceStart -Name $Name
}

function Get-JDManagedServiceStatus {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    return Get-JDManagedServiceState -Name $Name
}
