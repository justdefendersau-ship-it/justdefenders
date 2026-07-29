#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-State.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Runtime State
#
# Purpose:
#   Canonical runtime state store for the Managed Service Engine.
#

Set-StrictMode -Version Latest

if (-not (Get-Variable -Name ManagedServiceRuntime -Scope Script -ErrorAction SilentlyContinue)) {
    $script:ManagedServiceRuntime = [ordered]@{}
}

$script:ManagedServiceValidStates = @(
    'Unregistered',
    'Registered',
    'Starting',
    'Running',
    'Stopping',
    'Stopped',
    'Failed'
)

function Initialize-JDManagedServiceState {
    [CmdletBinding()]
    param()

    $script:ManagedServiceRuntime = [ordered]@{}
    return $script:ManagedServiceRuntime
}

function Test-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return $script:ManagedServiceRuntime.Contains($Name)
}

function Get-JDManagedServiceStates {
    [CmdletBinding()]
    param()

    return $script:ManagedServiceRuntime.Values
}

function Get-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if (-not (Test-JDManagedServiceState -Name $Name)) {
        throw "Managed service state '$Name' does not exist."
    }

    return $script:ManagedServiceRuntime[$Name]
}

function Set-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [ValidateSet(
            'Unregistered',
            'Registered',
            'Starting',
            'Running',
            'Stopping',
            'Stopped',
            'Failed'
        )]
        [string]$RuntimeState,

        [string]$RegistrationState,

        [string]$HealthState,

        [hashtable]$RuntimeContext,

        [hashtable]$Metadata
    )

    $existing = $null
    if (Test-JDManagedServiceState -Name $Name) {
        $existing = $script:ManagedServiceRuntime[$Name]
    }

    $state = [pscustomobject]@{
        Name               = $Name
        RegistrationState  = if($PSBoundParameters.ContainsKey('RegistrationState')){$RegistrationState}else{$existing.RegistrationState}
        RuntimeState       = if($PSBoundParameters.ContainsKey('RuntimeState')){$RuntimeState}else{$existing.RuntimeState}
        HealthState        = if($PSBoundParameters.ContainsKey('HealthState')){$HealthState}else{$existing.HealthState}
        LastUpdated        = Get-Date
        LastStarted        = $existing.LastStarted
        LastStopped        = $existing.LastStopped
        LastHealthCheck    = $existing.LastHealthCheck
        RuntimeContext     = if($RuntimeContext){$RuntimeContext}else{$existing.RuntimeContext}
        Metadata           = if($Metadata){$Metadata}else{$existing.Metadata}
    }

    switch ($state.RuntimeState) {
        'Running'  { $state.LastStarted = Get-Date }
        'Stopped'  { $state.LastStopped = Get-Date }
    }

    if ($PSBoundParameters.ContainsKey('HealthState')) {
        $state.LastHealthCheck = Get-Date
    }

    $script:ManagedServiceRuntime[$Name] = $state

    return $state
}

function Remove-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if (Test-JDManagedServiceState -Name $Name) {
        [void]$script:ManagedServiceRuntime.Remove($Name)
        return $true
    }

    return $false
}
