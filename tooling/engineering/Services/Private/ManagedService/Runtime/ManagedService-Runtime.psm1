<#
==============================================================================
JustDefenders® Engineering Platform
Copyright (c) JustDefenders. All Rights Reserved.

FILE
    ManagedService-Runtime.psm1

PATH
    C:\dev\justdefenders\frontend\
    tooling\engineering\Services\Private\ManagedService\Runtime\
    ManagedService-Runtime.psm1

DESCRIPTION
    Managed Service Runtime Engine

    Provides the in-memory runtime registry used by the managed
    service lifecycle. This module owns runtime state only.

AUTHOR
    JustDefenders Engineering

STATUS
    Alpha Engineering Baseline

==============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module Script Variables
#------------------------------------------------------------------------------

if (-not (Get-Variable -Name ManagedServiceRuntimeStore -Scope Script -ErrorAction SilentlyContinue))
{
    $script:ManagedServiceRuntimeStore = @{}
}

#------------------------------------------------------------------------------
# Private Helper Functions
#------------------------------------------------------------------------------

function New-ManagedServiceRuntimeObject
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    return [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Runtime'

        ServiceName      = $ServiceName

        CurrentState     = 'NEW'

        ProcessId        = $null

        Process          = $null

        StartedAt        = $null

        StoppedAt        = $null

        LastHeartbeat    = $null

        Health           = 'Unknown'

        LastError        = $null

        RetryCount       = 0
    }
}

function Test-ManagedServiceRuntimeExists
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]$ServiceName
    )

    return $script:ManagedServiceRuntimeStore.ContainsKey($ServiceName)
}

function Get-ManagedServiceRuntimeInternal
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]$ServiceName
    )

    if (-not (Test-ManagedServiceRuntimeExists -ServiceName $ServiceName))
    {
        throw "Managed service runtime '$ServiceName' is not registered."
    }

    return $script:ManagedServiceRuntimeStore[$ServiceName]
}

function Set-ManagedServiceRuntimeInternal
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [psobject]$Runtime
    )

    $script:ManagedServiceRuntimeStore[$Runtime.ServiceName] = $Runtime

    return $Runtime
}

#------------------------------------------------------------------------------
# Public Functions
#------------------------------------------------------------------------------
function New-JDManagedServiceRuntime
{
    <#
    .SYNOPSIS
        Creates a new managed service runtime.

    .DESCRIPTION
        Creates a new runtime object and registers it in the
        in-memory runtime store.

    .PARAMETER ServiceName
        Name of the managed service.

    .OUTPUTS
        JD.ManagedService.Runtime
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    if (Test-ManagedServiceRuntimeExists -ServiceName $ServiceName)
    {
        throw "Managed service runtime '$ServiceName' already exists."
    }

    $runtime = New-ManagedServiceRuntimeObject `
        -ServiceName $ServiceName

    Set-ManagedServiceRuntimeInternal `
        -Runtime $runtime | Out-Null

    Write-Verbose "Managed service runtime '$ServiceName' created."

    return $runtime
}

function Get-JDManagedServiceRuntime
{
    <#
    .SYNOPSIS
        Returns a managed service runtime.

    .DESCRIPTION
        Retrieves a managed service runtime from the
        runtime registry.

    .PARAMETER ServiceName
        Name of the managed service.

    .OUTPUTS
        JD.ManagedService.Runtime
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    return Get-ManagedServiceRuntimeInternal `
        -ServiceName $ServiceName
}
function Set-JDManagedServiceRuntimeState
{
    <#
    .SYNOPSIS
        Updates the runtime state of a managed service.

    .DESCRIPTION
        Updates the runtime object held in the runtime registry.
        Timestamp fields are maintained automatically for the
        standard lifecycle states.

    .PARAMETER ServiceName
        Managed service name.

    .PARAMETER State
        New lifecycle state.

    .PARAMETER Health
        Optional health status.

    .PARAMETER LastError
        Optional error message.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName,

        [Parameter(Mandatory)]
        [ValidateSet(
            'NEW',
            'REGISTERED',
            'STARTING',
            'RUNNING',
            'STOPPING',
            'STOPPED',
            'FAILED'
        )]
        [string]$State,

        [string]$Health,

        [string]$LastError
    )

    $runtime = Get-ManagedServiceRuntimeInternal `
        -ServiceName $ServiceName

    $runtime.CurrentState = $State

    switch ($State)
    {
        'STARTING'
        {
            if (-not $runtime.StartedAt)
            {
                $runtime.StartedAt = Get-Date
            }
        }

        'RUNNING'
        {
            if (-not $runtime.StartedAt)
            {
                $runtime.StartedAt = Get-Date
            }

            $runtime.LastHeartbeat = Get-Date
        }

        'STOPPED'
        {
            $runtime.StoppedAt = Get-Date
        }

        'FAILED'
        {
            $runtime.LastHeartbeat = Get-Date
        }
    }

    if ($PSBoundParameters.ContainsKey('Health'))
    {
        $runtime.Health = $Health
    }

    if ($PSBoundParameters.ContainsKey('LastError'))
    {
        $runtime.LastError = $LastError
    }

    Set-ManagedServiceRuntimeInternal `
        -Runtime $runtime | Out-Null

    Write-Verbose "Managed service '$ServiceName' state changed to '$State'."

    return $runtime
}

Export-ModuleMember `
    -Function `
        New-JDManagedServiceRuntime,
        Get-JDManagedServiceRuntime,
        Set-JDManagedServiceRuntimeState