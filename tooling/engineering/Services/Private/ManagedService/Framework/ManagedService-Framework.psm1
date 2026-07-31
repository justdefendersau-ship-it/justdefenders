<#
==============================================================================
JustDefenders © Engineering Framework

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService\Framework\ManagedService-Framework.psm1

Timestamp
30 July 2026 21:48

Work Package
WP-PR-011

Component
Managed Service Framework Kernel

Purpose
Provides immutable framework metadata, compatibility validation and
framework information services for the Managed Service Framework.

Responsibilities

    • Publish framework metadata.
    • Publish schema versions.
    • Publish compatibility information.
    • Publish managed service state definitions.
    • Validate host compatibility.
    • Provide framework information APIs.

Notes

    This module owns framework identity only.

    It does not create runtime objects.

    It does not perform service registration.

    It does not maintain runtime state.

==============================================================================#>

Set-StrictMode -Version Latest

#==============================================================================
# SCRIPT VARIABLES
#==============================================================================

$script:Framework = [ordered]@{

    Name                  = 'ManagedService'

    DisplayName           = 'JustDefenders Managed Service Framework'

    Description           = 'Managed Service Infrastructure'

    FrameworkVersion      = [version]'1.0.0'

    ContractVersion       = [version]'1.0.0'

    RuntimeVersion        = [version]'1.0.0'

    LifecycleVersion      = [version]'1.0.0'

    DiagnosticsVersion    = [version]'1.0.0'

    EventsVersion         = [version]'1.0.0'

    SchemaVersion         = [version]'2.0.0'

    MinimumPowerShell     = [version]'7.3.0'

    BuildDate             = Get-Date

    Initialised           = $true
}

#==============================================================================
# MANAGED SERVICE STATES
#==============================================================================

$script:ManagedServiceStates = @{

    New          = 'NEW'

    Validating   = 'VALIDATING'

    Validated    = 'VALIDATED'

    Rejected     = 'REJECTED'

    Registered   = 'REGISTERED'

    Resolved     = 'RESOLVED'

    Starting     = 'STARTING'

    Running      = 'RUNNING'

    Degraded     = 'DEGRADED'

    Failed       = 'FAILED'

    Recovering   = 'RECOVERING'

    Stopping     = 'STOPPING'

    Stopped      = 'STOPPED'

    Retired      = 'RETIRED'
}

#==============================================================================
# VALID STATE TRANSITIONS
#==============================================================================

$script:StateTransitions = @{

    NEW          = @('VALIDATING')

    VALIDATING   = @('VALIDATED','REJECTED')

    VALIDATED    = @('REGISTERED')

    REGISTERED   = @('STARTING')

    STARTING     = @('RUNNING','FAILED')

    RUNNING      = @('DEGRADED','FAILED','STOPPING')

    DEGRADED     = @('RUNNING','FAILED','STOPPING')

    FAILED       = @('RECOVERING','STOPPED')

    RECOVERING   = @('RUNNING','FAILED','STOPPED')

    STOPPING     = @('STOPPED')

    STOPPED      = @('STARTING','RETIRED')

    RETIRED      = @()
}

#==============================================================================
# PRIVATE FUNCTIONS
#==============================================================================

function Test-FrameworkPowerShellVersion
{
    [CmdletBinding()]
    param()

    return ($PSVersionTable.PSVersion -ge
        $script:Framework.MinimumPowerShell)
}

function Get-FrameworkMetadata
{
    [CmdletBinding()]
    param()

    return [pscustomobject]$script:Framework
}

function Get-FrameworkStates
{
    [CmdletBinding()]
    param()

    return $script:ManagedServiceStates.Clone()
}
#==============================================================================
# PUBLIC FUNCTIONS
#==============================================================================

function Get-JDManagedServiceFramework
{
    <#
    .SYNOPSIS
        Returns Managed Service Framework metadata.

    .DESCRIPTION
        Returns immutable framework metadata describing the currently
        loaded Managed Service Framework.
    #>

    [CmdletBinding()]
    param()

    return (Get-FrameworkMetadata)
}

#------------------------------------------------------------------------------

function Get-JDManagedServiceVersion
{
    <#
    .SYNOPSIS
        Returns framework version information.
    #>

    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Framework   = $script:Framework.FrameworkVersion

        Contract    = $script:Framework.ContractVersion

        Runtime     = $script:Framework.RuntimeVersion

        Lifecycle   = $script:Framework.LifecycleVersion

        Events      = $script:Framework.EventsVersion

        Diagnostics = $script:Framework.DiagnosticsVersion

        Schema      = $script:Framework.SchemaVersion
    }
}

#------------------------------------------------------------------------------

function Get-JDManagedServiceSchema
{
    <#
    .SYNOPSIS
        Returns schema information.
    #>

    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        SchemaVersion      = $script:Framework.SchemaVersion

        ContractVersion    = $script:Framework.ContractVersion

        RuntimeVersion     = $script:Framework.RuntimeVersion

        LifecycleVersion   = $script:Framework.LifecycleVersion
    }
}

#------------------------------------------------------------------------------

function Get-JDManagedServiceStates
{
    <#
    .SYNOPSIS
        Returns all supported Managed Service states.
    #>

    [CmdletBinding()]
    param()

    return (Get-FrameworkStates)
}

#------------------------------------------------------------------------------

function Test-JDManagedServiceCompatibility
{
    <#
    .SYNOPSIS
        Tests host compatibility with the framework.
    #>

    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Compatible            = Test-FrameworkPowerShellVersion

        CurrentPowerShell     = $PSVersionTable.PSVersion

        MinimumPowerShell     = $script:Framework.MinimumPowerShell

        FrameworkVersion      = $script:Framework.FrameworkVersion

        SchemaVersion         = $script:Framework.SchemaVersion
    }
}

#------------------------------------------------------------------------------

function Test-JDManagedServiceTransition
{
    <#
    .SYNOPSIS
        Tests whether a lifecycle transition is valid.
    #>

    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $CurrentState,

        [Parameter(Mandatory)]
        [string]
        $NextState
    )

    if (-not $script:StateTransitions.ContainsKey($CurrentState))
    {
        return $false
    }

    return ($script:StateTransitions[$CurrentState] -contains $NextState)
}

#==============================================================================
# MODULE INITIALISATION
#==============================================================================

Write-Host "" -ForegroundColor DarkGray
Write-Host "============================================================" -ForegroundColor DarkGray
Write-Host " Managed Service Framework Kernel Loaded" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor DarkGray
Write-Host "" -ForegroundColor DarkGray

#==============================================================================
# EXPORT PUBLIC API
#==============================================================================

Export-ModuleMember `
    -Function @(
        'Get-JDManagedServiceFramework',
        'Get-JDManagedServiceVersion',
        'Get-JDManagedServiceSchema',
        'Get-JDManagedServiceStates',
        'Test-JDManagedServiceCompatibility',
        'Test-JDManagedServiceTransition'
    )

#==============================================================================
# END OF FILE
#==============================================================================