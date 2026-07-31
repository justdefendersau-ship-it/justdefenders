<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Validation-Execution.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Validation\
Validation-Execution.psm1

Module:
Engineering Validation Execution

Version:
1.1.0

Work Package:
WP-003E.2B – Validation Execution Engine

Engineering Baseline:
WP003E2_VALIDATION_EXECUTION_V110

Timestamp:
3rd July 2026, 08:40 AEST

Status:
Production Candidate

Purpose

Executes validation targets produced by the Validation Discovery engine.

Responsibilities

    • Dependency Queue Construction
    • Module Import
    • Test Execution
    • Exception Isolation
    • Timing
    • Result Aggregation

This module performs execution only.

Repository discovery and reporting are delegated to dedicated modules.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module State
#------------------------------------------------------------------------------

$Script:Module = [ordered]@{

    Name = "Engineering Validation Execution"

    Version = "1.1.0"

    Baseline = "WP003E2_VALIDATION_EXECUTION_V110"

    Initialised = $true
}

#------------------------------------------------------------------------------
# Execution Engine State
#------------------------------------------------------------------------------

$Script:ExecutionEngine = [ordered]@{

    Queue = New-Object System.Collections.ArrayList

    Results = New-Object System.Collections.ArrayList

    Failures = New-Object System.Collections.ArrayList

    Statistics = [ordered]@{

        Started = $null

        Finished = $null

        Duration = [TimeSpan]::Zero

        Targets = 0

        Passed = 0

        Failed = 0

        Warnings = 0
    }

    Configuration = $null
}

#------------------------------------------------------------------------------
# Validation Queue Object
#------------------------------------------------------------------------------

function New-JDExecutionQueue
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Execution.Queue"

        Targets = @($Targets)

        Count = @($Targets).Count

        Created = Get-Date
    }
}

#------------------------------------------------------------------------------
# Validation Result Object
#------------------------------------------------------------------------------

function New-JDExecutionResult
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Target,

        [Parameter(Mandatory)]
        [bool]
        $Success,

        [Parameter(Mandatory)]
        [TimeSpan]
        $Duration,

        [AllowNull()]
        [System.Management.Automation.ErrorRecord]
        $ErrorRecord = $null
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Execution.Result"

        Name = $Target.Name

        Category = $Target.Category

        ModulePath = $Target.ModulePath

        TestPath = $Target.TestPath

        Success = $Success

        Duration = $Duration

        ErrorRecord = $ErrorRecord

        Exception = if($ErrorRecord)
        {
            $ErrorRecord.Exception
        }
        else
        {
            $null
        }

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Execution Object
#------------------------------------------------------------------------------

function New-JDExecution
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Execution"

        Started = Get-Date

        Queue = $null

        Results = @()

        Statistics = $null

        Success = $false
    }
}

#------------------------------------------------------------------------------
# Dependency Queue Builder
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Engine Reset
#------------------------------------------------------------------------------

function Reset-JDExecutionEngine
{
    [CmdletBinding()]
    param()

    $Script:ExecutionEngine.Queue.Clear()

    $Script:ExecutionEngine.Results.Clear()

    $Script:ExecutionEngine.Failures.Clear()

    $Script:ExecutionEngine.Statistics.Started = $null

    $Script:ExecutionEngine.Statistics.Finished = $null

    $Script:ExecutionEngine.Statistics.Duration = [TimeSpan]::Zero

    $Script:ExecutionEngine.Statistics.Targets = 0

    $Script:ExecutionEngine.Statistics.Passed = 0

    $Script:ExecutionEngine.Statistics.Failed = 0

    $Script:ExecutionEngine.Statistics.Warnings = 0
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Dependency Resolution
#------------------------------------------------------------------------------

function Resolve-JDExecutionOrder
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets
    )

    $Resolved = New-Object System.Collections.ArrayList
    $Visiting = @{}
    $Visited = @{}

    $TargetLookup = @{}

    foreach($Target in $Targets)
    {
        $TargetLookup[$Target.Name] = $Target
    }

    function Resolve-Target
    {
        param([string]$Name)

        if($Visited.ContainsKey($Name))
        {
            return
        }

        if($Visiting.ContainsKey($Name))
        {
            throw (
                "Circular dependency detected involving '{0}'." -f
                $Name
            )
        }

        if(-not $TargetLookup.ContainsKey($Name))
        {
            throw (
                "Unknown dependency '{0}'." -f
                $Name
            )
        }

        $Visiting[$Name] = $true

        $Target = $TargetLookup[$Name]

        foreach($Dependency in $Target.Dependencies)
        {
            Resolve-Target $Dependency
        }

        $Visiting.Remove($Name)

        $Visited[$Name] = $true

        [void]$Resolved.Add($Target)
    }

    foreach($Target in $Targets)
    {
        Resolve-Target $Target.Name
    }

    return @($Resolved)
}

#------------------------------------------------------------------------------
# Queue Construction
#------------------------------------------------------------------------------

function Get-JDExecutionQueue
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets
    )

    $Ordered =
        Resolve-JDExecutionOrder `
            -Targets $Targets

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Execution.Queue"

        Targets =
            $Ordered

        Count =
            $Ordered.Count

        Created =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Target Execution
#------------------------------------------------------------------------------

function Invoke-JDExecutionTarget
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Target
    )

    $Stopwatch =
        [System.Diagnostics.Stopwatch]::StartNew()

    try
    {
        Import-Module `
            $Target.ModulePath `
            -Force `
            -ErrorAction Stop

        & $Target.TestPath

        $Stopwatch.Stop()

        return New-JDExecutionResult `
            -Target $Target `
            -Success $true `
            -Duration $Stopwatch.Elapsed
    }
    catch
    {
        $Stopwatch.Stop()

        return New-JDExecutionResult `
            -Target $Target `
            -Success $false `
            -Duration $Stopwatch.Elapsed `
            -ErrorRecord $_
    }
}

#------------------------------------------------------------------------------
# Execution Statistics
#------------------------------------------------------------------------------

function Update-JDExecutionStatistics
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Result
    )

    $Script:ExecutionEngine.Statistics.Targets++

    if($Result.Success)
    {
        $Script:ExecutionEngine.Statistics.Passed++
    }
    else
    {
        $Script:ExecutionEngine.Statistics.Failed++

        [void]$Script:ExecutionEngine.Failures.Add(
            $Result
        )
    }

    [void]$Script:ExecutionEngine.Results.Add(
        $Result
    )
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Module Import
#------------------------------------------------------------------------------

function Import-JDValidationModule
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $ModulePath
    )

    Import-Module `
        -Name $ModulePath `
        -Force `
        -ErrorAction Stop
}

#------------------------------------------------------------------------------
# Test Execution
#------------------------------------------------------------------------------

function Invoke-JDValidationTest
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $TestPath
    )

    & $TestPath
}

#------------------------------------------------------------------------------
# Validation Execution
#------------------------------------------------------------------------------

function Invoke-JDValidationExecution
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration,

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets
    )

    Reset-JDExecutionEngine

    $Script:ExecutionEngine.Configuration = $Configuration

    $Script:ExecutionEngine.Statistics.Started = Get-Date

    $Queue =
        Get-JDExecutionQueue `
            -Targets $Targets

    foreach($Target in $Queue.Targets)
    {
        $Stopwatch =
            [System.Diagnostics.Stopwatch]::StartNew()

        try
        {
            Import-JDValidationModule `
                -ModulePath $Target.ModulePath

            Invoke-JDValidationTest `
                -TestPath $Target.TestPath

            $Stopwatch.Stop()

            $Result =
                New-JDExecutionResult `
                    -Target $Target `
                    -Success $true `
                    -Duration $Stopwatch.Elapsed
        }
        catch
        {
            $Stopwatch.Stop()

            $Result =
                New-JDExecutionResult `
                    -Target $Target `
                    -Success $false `
                    -Duration $Stopwatch.Elapsed `
                    -ErrorRecord $_
        }

        Update-JDExecutionStatistics `
            -Result $Result
    }

    $Script:ExecutionEngine.Statistics.Finished =
        Get-Date

    $Script:ExecutionEngine.Statistics.Duration =
        $Script:ExecutionEngine.Statistics.Finished -
        $Script:ExecutionEngine.Statistics.Started

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Execution"

        Success =
            ($Script:ExecutionEngine.Statistics.Failed -eq 0)

        Queue =
            $Queue

        Results =
            @($Script:ExecutionEngine.Results)

        Failures =
            @($Script:ExecutionEngine.Failures)

        Statistics =
            $Script:ExecutionEngine.Statistics
    }
}

#------------------------------------------------------------------------------
# Module Version
#------------------------------------------------------------------------------

function Get-JDValidationExecutionVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Execution.Version"

        Name =
            $Script:Module.Name

        Version =
            $Script:Module.Version

        Baseline =
            $Script:Module.Baseline

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Module Integrity
#------------------------------------------------------------------------------

function Test-JDExecutionEngine
{
    [CmdletBinding()]
    param()

    $Functions = @(

        'Invoke-JDValidationExecution',

        'Get-JDExecutionQueue',

        'Test-JDExecutionEngine',

        'Get-JDValidationExecutionVersion'
    )

    $Missing = @()

    foreach($Function in $Functions)
    {
        if(-not (Get-Command $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Execution.Validation"

        Success =
            ($Missing.Count -eq 0)

        FunctionCount =
            $Functions.Count

        MissingFunctions =
            $Missing

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    'Invoke-JDValidationExecution',

    'Get-JDExecutionQueue',

    'Test-JDExecutionEngine',

    'Get-JDValidationExecutionVersion'
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Write-Verbose (
    "{0} v{1} initialised successfully." -f
    $Script:Module.Name,
    $Script:Module.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering

Validation Execution

Version:
1.1.0

Status:
Complete

Engineering Baseline:
WP003E2_VALIDATION_EXECUTION_V110

===============================================================================
#>