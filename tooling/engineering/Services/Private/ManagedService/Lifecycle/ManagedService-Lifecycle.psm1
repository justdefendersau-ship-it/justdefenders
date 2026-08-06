<#
==============================================================================
JustDefenders® Engineering Platform
Copyright (c) JustDefenders. All Rights Reserved.

FILE
    ManagedService-Lifecycle.psm1

PATH
    C:\dev\justdefenders\frontend\
    tooling\engineering\Services\Private\ManagedService\Lifecycle\
    ManagedService-Lifecycle.psm1

DESCRIPTION
    Managed Service Lifecycle Engine

    Provides lifecycle orchestration for managed services.
    Runtime state is owned by ManagedService-Runtime.psm1.

AUTHOR
    JustDefenders Engineering

STATUS
    Alpha Engineering Baseline

==============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Runtime Dependency
#------------------------------------------------------------------------------

$runtimeModule = Join-Path `
    $PSScriptRoot `
    "..\Runtime\ManagedService-Runtime.psm1"

Import-Module `
    $runtimeModule `
    -Force `
    -DisableNameChecking

#------------------------------------------------------------------------------
# Private Helper Functions
#------------------------------------------------------------------------------

function Assert-ManagedServiceExists
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    try
    {
        Get-JDManagedServiceRuntime `
            -ServiceName $ServiceName | Out-Null
    }
    catch
    {
        throw "Managed service '$ServiceName' is not registered."
    }
}

function Invoke-ManagedServiceTransition
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]$ServiceName,

        [Parameter(Mandatory)]
        [string]$State,

        [string]$Health,

        [string]$LastError,

        [Parameter()]
        [AllowNull()]
        [object]$Metadata
    )

    $parameters = @{
        ServiceName = $ServiceName
        State       = $State
    }

    if ($PSBoundParameters.ContainsKey('Health'))
    {
        $parameters.Health = $Health
    }

    if ($PSBoundParameters.ContainsKey('LastError'))
    {
        $parameters.LastError = $LastError
    }

    if ($PSBoundParameters.ContainsKey('Metadata'))
    {
        $parameters.Metadata = $Metadata
    }

    return Set-JDManagedServiceRuntimeState @parameters
}

function Resolve-ManagedServiceRuntimeMetadata
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    $runtime = Get-JDManagedServiceRuntime `
        -ServiceName $ServiceName

    if ($runtime.Metadata)
    {
        return $runtime.Metadata
    }

    if (Get-Command Get-JDManagedServiceState -ErrorAction SilentlyContinue)
    {
        try
        {
            $state = Get-JDManagedServiceState -Name $ServiceName

            if ($state -and $state.PSObject.Properties['Metadata'] -and $null -ne $state.Metadata)
            {
                Invoke-ManagedServiceTransition `
                    -ServiceName $ServiceName `
                    -State $runtime.CurrentState `
                    -Metadata $state.Metadata | Out-Null

                return $state.Metadata
            }
        }
        catch
        {
        }
    }

    return $null
}

function Get-ManagedServiceMetadataValue
{
    [CmdletBinding()]
    param
    (
        [Parameter()]
        [AllowNull()]
        [object]$Metadata,

        [Parameter(Mandatory)]
        [string]$Name
    )

    if (-not $Metadata)
    {
        return $null
    }

    if ($Metadata -is [hashtable])
    {
        if ($Metadata.ContainsKey($Name))
        {
            return $Metadata[$Name]
        }

        return $null
    }

    if ($Metadata.PSObject.Properties[$Name])
    {
        return $Metadata.$Name
    }

    return $null
}

function Invoke-JDManagedServiceExecute
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName,

        [Parameter(Mandatory)]
        [ValidateSet('Start','Stop')]
        [string]$Action
    )

    $runtime = Get-JDManagedServiceRuntime `
        -ServiceName $ServiceName

    $metadata = Resolve-ManagedServiceRuntimeMetadata `
        -ServiceName $ServiceName
    $executeCommand = Get-ManagedServiceMetadataValue `
        -Metadata $metadata `
        -Name 'ExecuteCommand'

    if ($executeCommand -and $executeCommand -ne 'Invoke-JDManagedServiceExecute')
    {
        if (Get-Command $executeCommand -ErrorAction SilentlyContinue)
        {
            return & $executeCommand `
                -ServiceName $ServiceName `
                -Action $Action
        }
    }

    $commandName =
        if ($Action -eq 'Start')
        {
            Get-ManagedServiceMetadataValue `
                -Metadata $metadata `
                -Name 'StartupCommand'
        }
        else
        {
            Get-ManagedServiceMetadataValue `
                -Metadata $metadata `
                -Name 'StopCommand'
        }

    if ($commandName)
    {
        return & $commandName
    }

    return $null
}

#------------------------------------------------------------------------------
# Public Functions
#------------------------------------------------------------------------------
function Register-JDManagedService
{
    <#
    .SYNOPSIS
        Registers a managed service.

    .DESCRIPTION
        Creates a runtime instance for the managed service and
        transitions it into the REGISTERED state.

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
        [string]$ServiceName,

        [Parameter()]
        [AllowNull()]
        [object]$Metadata
    )

    $runtime = New-JDManagedServiceRuntime `
        -ServiceName $ServiceName `
        -Metadata $Metadata

    $runtime = Invoke-ManagedServiceTransition `
        -ServiceName $ServiceName `
        -State REGISTERED `
        -Metadata $Metadata

    Write-Verbose "Managed service '$ServiceName' registered."

    return $runtime
}

function Get-JDManagedServiceStatus
{
    <#
    .SYNOPSIS
        Returns the current managed service runtime.

    .DESCRIPTION
        Retrieves the runtime object for the specified managed
        service.

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

    Assert-ManagedServiceExists `
        -ServiceName $ServiceName

    return Get-JDManagedServiceRuntime `
        -ServiceName $ServiceName
}
function Start-JDManagedService
{
    <#
    .SYNOPSIS
        Starts a managed service.

    .DESCRIPTION
        Transitions the managed service into the RUNNING state.
        Process hosting is performed by Operational-ServiceHost.

    .PARAMETER ServiceName
        Managed service name.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    Assert-ManagedServiceExists `
        -ServiceName $ServiceName

    Invoke-JDManagedServiceExecute `
        -ServiceName $ServiceName `
        -Action 'Start' | Out-Null

    return Invoke-ManagedServiceTransition `
        -ServiceName $ServiceName `
        -State RUNNING `
        -Health Healthy
}

function Stop-JDManagedService
{
    <#
    .SYNOPSIS
        Stops a managed service.

    .DESCRIPTION
        Transitions the managed service into the STOPPED state.

    .PARAMETER ServiceName
        Managed service name.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    Assert-ManagedServiceExists `
        -ServiceName $ServiceName

    Invoke-JDManagedServiceExecute `
        -ServiceName $ServiceName `
        -Action 'Stop' | Out-Null

    return Invoke-ManagedServiceTransition `
        -ServiceName $ServiceName `
        -State STOPPED `
        -Health Stopped
}

function Restart-JDManagedService
{
    <#
    .SYNOPSIS
        Restarts a managed service.

    .DESCRIPTION
        Performs a simple stop/start transition.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$ServiceName
    )

    Stop-JDManagedService `
        -ServiceName $ServiceName | Out-Null

    return Start-JDManagedService `
        -ServiceName $ServiceName
}

Export-ModuleMember `
    -Function `
        Register-JDManagedService,
        Start-JDManagedService,
        Stop-JDManagedService,
        Restart-JDManagedService,
        Get-JDManagedServiceStatus