<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
C:\dev\justdefenders\frontend\tooling\engineering\Common\Engineering-Common.psm1

Work Package:
WP-C001

Module:
Engineering Common

Version:
1.0.0

Timestamp:
08 July 2026 14:30 AEST

Purpose:
Provides the common engineering primitives used throughout the
JustDefenders Engineering Toolkit.

Subsystems consuming this module include:

    • Repository Recovery
    • Validation
    • Security Foundation
    • Diagnostics
    • Deployment

The module intentionally contains no repository-specific logic.

===============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

#------------------------------------------------------------------------------
# Module Metadata
#------------------------------------------------------------------------------

$Script:EngineeringCommon = [PSCustomObject]@{

    ModuleName     = "Engineering-Common"

    Version        = "1.0.0"

    WorkPackage    = "WP-C001"

    Initialised    = $true

    Timestamp      = Get-Date

    PowerShell     = $PSVersionTable.PSVersion.ToString()

    Framework      = "JustDefenders Engineering Toolkit"

}

#------------------------------------------------------------------------------
# Internal Enumerations
#------------------------------------------------------------------------------

$Script:EngineeringResultStates = @(
    "Pass",
    "Fail",
    "Warning",
    "Information"
)

$Script:EngineeringLogLevels = @(
    "Information",
    "Warning",
    "Error",
    "Verbose"
)

#------------------------------------------------------------------------------
# Module Version
#------------------------------------------------------------------------------

function Get-JDEngineeringVersion
{
    [CmdletBinding()]

    param()

    return [PSCustomObject]@{

        Module      = $Script:EngineeringCommon.ModuleName

        Version     = $Script:EngineeringCommon.Version

        WorkPackage = $Script:EngineeringCommon.WorkPackage

        Initialised = $Script:EngineeringCommon.Initialised

        Timestamp   = Get-Date

        PowerShell  = $PSVersionTable.PSVersion.ToString()

    }
}

#------------------------------------------------------------------------------
# Engineering Context
#------------------------------------------------------------------------------

function New-JDEngineeringContext
{
    [CmdletBinding()]

    param
    (
        [Parameter()]
        [string]
        $RepositoryRoot = (Get-Location).Path,

        [Parameter()]
        [string]
        $Subsystem = "General"
    )

    return [PSCustomObject]@{

    RepositoryRoot = $RepositoryRoot

    Subsystem      = $Subsystem

    StartTime      = Get-Date

    EndTime        = $null

    Duration       = [TimeSpan]::Zero

    Timer          = $null

    Result         = $null

    Success        = $false

    Warnings       = New-Object System.Collections.Generic.List[string]

    Errors         = New-Object System.Collections.Generic.List[string]

    Statistics     = [ordered]@{}

}
}

#------------------------------------------------------------------------------
# Standard Result Object
#------------------------------------------------------------------------------

function New-JDEngineeringResult
{
    [CmdletBinding()]

    param
    (
        [Parameter()]
        [bool]
        $Success = $false,

        [Parameter()]
        [string]
        $Message = ""
    )

    return [PSCustomObject]@{

        Success      = $Success

        Message      = $Message

        Version      = $Script:EngineeringCommon.Version

        WorkPackage  = $Script:EngineeringCommon.WorkPackage

        Timestamp    = Get-Date

        Duration     = [TimeSpan]::Zero

        Statistics   = [ordered]@{}

        Warnings     = @()

        Errors       = @()

    }
}

#------------------------------------------------------------------------------
# END PART 1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Engineering Timer Services
#------------------------------------------------------------------------------

function Start-JDEngineeringTimer
{
    [CmdletBinding()]
    param()

    $Stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

    return $Stopwatch
}

function Stop-JDEngineeringTimer
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [System.Diagnostics.Stopwatch]
        $Timer
    )

    $Timer.Stop()

    return $Timer.Elapsed
}

#------------------------------------------------------------------------------
# Engineering Logging
#------------------------------------------------------------------------------

function Write-JDEngineeringLog
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateSet(
            "Information",
            "Warning",
            "Error",
            "Verbose"
        )]
        [string]
        $Level,

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    $Prefix = switch ($Level)
    {
        "Information" { "[INFO ]" }
        "Warning"     { "[WARN ]" }
        "Error"       { "[ERROR]" }
        "Verbose"     { "[TRACE]" }
    }

    switch ($Level)
    {
        "Information"
        {
            Write-Host "$Prefix $Message"
        }

        "Warning"
        {
            Write-Warning $Message
        }

        "Error"
        {
            Write-Error $Message
        }

        "Verbose"
        {
            Write-Verbose $Message
        }
    }
}

#------------------------------------------------------------------------------
# Engineering Statistics
#------------------------------------------------------------------------------

function New-JDEngineeringStatistics
{
    [CmdletBinding()]
    param()

    return [ordered]@{

        FilesScanned = 0

        FilesModified = 0

        Warnings = 0

        Errors = 0

        StartTime = Get-Date

        EndTime = $null

    }
}

#------------------------------------------------------------------------------
# END PART 2
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Engineering Validation
#------------------------------------------------------------------------------

function Test-JDEngineeringModule
{
    [CmdletBinding()]
    param()

    $Result = New-JDEngineeringResult `
        -Success $true `
        -Message "Engineering module validation successful."

    $Checks = [ordered]@{

        VersionFunction = (
            Get-Command Get-JDEngineeringVersion `
                -ErrorAction SilentlyContinue
        ) -ne $null

        ContextFunction = (
            Get-Command New-JDEngineeringContext `
                -ErrorAction SilentlyContinue
        ) -ne $null

        ResultFunction = (
            Get-Command New-JDEngineeringResult `
                -ErrorAction SilentlyContinue
        ) -ne $null

        TimerStartFunction = (
            Get-Command Start-JDEngineeringTimer `
                -ErrorAction SilentlyContinue
        ) -ne $null

        TimerStopFunction = (
            Get-Command Stop-JDEngineeringTimer `
                -ErrorAction SilentlyContinue
        ) -ne $null

        LoggingFunction = (
            Get-Command Write-JDEngineeringLog `
                -ErrorAction SilentlyContinue
        ) -ne $null

        StatisticsFunction = (
            Get-Command New-JDEngineeringStatistics `
                -ErrorAction SilentlyContinue
        ) -ne $null
    }

    $Result.Statistics = $Checks

    foreach ($Check in $Checks.GetEnumerator())
    {
        if (-not $Check.Value)
        {
            $Result.Success = $false

            $Result.Errors += (
                "Missing function: {0}" -f
                $Check.Key
            )
        }
    }

    return $Result
}

#------------------------------------------------------------------------------
# Engineering Assertions
#------------------------------------------------------------------------------

function Assert-JDEngineeringContext
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]
        $Context
    )

    if ($null -eq $Context)
    {
        throw "Engineering context cannot be null."
    }

    if (-not $Context.PSObject.Properties.Match("RepositoryRoot"))
    {
        throw "RepositoryRoot property missing."
    }

    return $true
}

function Assert-JDEngineeringResult
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]
        $Result
    )

    if ($null -eq $Result)
    {
        throw "Engineering result cannot be null."
    }

    if (-not $Result.PSObject.Properties.Match("Success"))
    {
        throw "Success property missing."
    }

    return $true
}

#------------------------------------------------------------------------------
# END PART 3
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Engineering Module Registry
#------------------------------------------------------------------------------

$Script:EngineeringRegistry =
    New-Object System.Collections.Generic.List[object]

function Register-JDEngineeringModule
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [string]
        $Version,

        [Parameter()]
        [string]
        $WorkPackage = "",

        [Parameter()]
        [string]
        $Description = ""
    )

    $Existing =
        $Script:EngineeringRegistry |
        Where-Object {
            $_.Name -eq $Name
        }

    if ($Existing)
    {
        return $Existing
    }

    $Module = [PSCustomObject]@{

        Name         = $Name

        Version      = $Version

        WorkPackage  = $WorkPackage

        Description  = $Description

        Registered   = Get-Date

    }

    $Script:EngineeringRegistry.Add($Module)

    return $Module
}

function Get-JDEngineeringModules
{
    [CmdletBinding()]
    param()

    return $Script:EngineeringRegistry
}

#------------------------------------------------------------------------------
# Shared Engineering Context
#------------------------------------------------------------------------------

$Script:CurrentEngineeringContext = $null

function Set-JDEngineeringContext
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]
        $Context
    )

    Assert-JDEngineeringContext $Context

    $Script:CurrentEngineeringContext = $Context

    return $Script:CurrentEngineeringContext
}

function Get-JDEngineeringContext
{
    [CmdletBinding()]
    param()

    return $Script:CurrentEngineeringContext
}

#------------------------------------------------------------------------------
# Initialise Registry
#------------------------------------------------------------------------------

Register-JDEngineeringModule `
    -Name "Engineering-Common" `
    -Version $Script:EngineeringCommon.Version `
    -WorkPackage $Script:EngineeringCommon.WorkPackage `
    -Description "Shared engineering services." |
    Out-Null

#------------------------------------------------------------------------------
# END PART 4
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Engineering Module Lifecycle
#------------------------------------------------------------------------------

function Initialize-JDEngineeringModule
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $ModuleName,

        [Parameter()]
        [string]
        $WorkPackage = ""
    )

    $Context = New-JDEngineeringContext `
        -Subsystem $ModuleName

    $Context.Statistics = New-JDEngineeringStatistics

    $Context.Timer = Start-JDEngineeringTimer

    Set-JDEngineeringContext `
        -Context $Context |
        Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Initialised module [{0}] ({1})" -f
            $ModuleName,
            $WorkPackage
        )

    return $Context
}

#------------------------------------------------------------------------------
# Complete Engineering Module
#------------------------------------------------------------------------------

function Complete-JDEngineeringModule
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]
        $Context,

        [Parameter()]
        [bool]
        $Success = $true
    )

    [void](Assert-JDEngineeringContext $Context)

    $Context.EndTime = Get-Date

    if ($Context.Timer)
    {
        $Context.Duration =
            Stop-JDEngineeringTimer `
                -Timer $Context.Timer
    }

    $Context.Success = $Success

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Completed module [{0}] in {1}" -f
            $Context.Subsystem,
            $Context.Duration
        )

    return $Context
}

#------------------------------------------------------------------------------
# Standard Execution Wrapper
#------------------------------------------------------------------------------

function Invoke-JDEngineeringExecution
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [scriptblock]
        $ScriptBlock,

        [Parameter()]
        [string]
        $ModuleName = "Engineering"
    )

    $Context =
        Initialize-JDEngineeringModule `
            -ModuleName $ModuleName

    try
    {
        & $ScriptBlock

        return (
            Complete-JDEngineeringModule `
                -Context $Context `
                -Success $true
        )
    }
    catch
    {
        $Context.Errors.Add(
            $_.Exception.Message
        )

        return (
            Complete-JDEngineeringModule `
                -Context $Context `
                -Success $false
        )
    }
}

#------------------------------------------------------------------------------
# END PART 5
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Write-JDEngineeringLog `
    -Level Information `
    -Message (
        "{0} v{1} initialised." -f
        $Script:EngineeringCommon.ModuleName,
        $Script:EngineeringCommon.Version
    )

#------------------------------------------------------------------------------
# Exported Functions
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(
    'Get-JDEngineeringVersion',
    'New-JDEngineeringContext',
    'New-JDEngineeringResult',
    'New-JDEngineeringStatistics',
    'Start-JDEngineeringTimer',
    'Stop-JDEngineeringTimer',
    'Write-JDEngineeringLog',
    'Register-JDEngineeringModule',
    'Get-JDEngineeringModules',
    'Set-JDEngineeringContext',
    'Get-JDEngineeringContext',
    'Initialize-JDEngineeringModule',
    'Complete-JDEngineeringModule',
    'Invoke-JDEngineeringExecution',
    'Assert-JDEngineeringContext',
    'Assert-JDEngineeringResult',
    'Test-JDEngineeringModule'
)

#------------------------------------------------------------------------------
# END PART 6
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Module Self Validation
#------------------------------------------------------------------------------

try
{
    $ModuleValidation = Test-JDEngineeringModule

    if ($ModuleValidation.Success)
    {
        Write-JDEngineeringLog `
            -Level Information `
            -Message (
                "{0} validation successful." -f
                $Script:EngineeringCommon.ModuleName
            )
    }
    else
    {
        Write-JDEngineeringLog `
            -Level Warning `
            -Message (
                "{0} validation completed with warnings." -f
                $Script:EngineeringCommon.ModuleName
            )
    }
}
catch
{
    Write-JDEngineeringLog `
        -Level Error `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Module Banner (Verbose Only)
#------------------------------------------------------------------------------

Write-Verbose (
@"

===============================================================================
JustDefenders© Engineering

Engineering Common Module

Version      : $($Script:EngineeringCommon.Version)
Work Package : $($Script:EngineeringCommon.WorkPackage)
PowerShell   : $($PSVersionTable.PSVersion)
Initialised  : $($Script:EngineeringCommon.Initialised)

===============================================================================

"@
)

#------------------------------------------------------------------------------
# Module Footer
#------------------------------------------------------------------------------

Write-JDEngineeringLog `
    -Level Information `
    -Message (
        "{0} ready." -f
        $Script:EngineeringCommon.ModuleName
    )

#------------------------------------------------------------------------------
# END OF MODULE
#------------------------------------------------------------------------------

