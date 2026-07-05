<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File
C:\dev\justdefenders\frontend\tooling\common\Validation\
Invoke-EngineeringValidation.ps1

Timestamp
2nd July 2026 08:50

Version
1.1.0

Engineering Baseline
ALPHA_BASELINE_20260701

Purpose

Primary orchestration entry point for the JustDefenders Engineering
Validation Toolkit.

Responsibilities

    • Repository Discovery
    • Validation Discovery
    • Validation Execution
    • Validation Reporting
    • Engineering Exit Codes

This script intentionally contains NO validation logic.

Discovery, execution and reporting are delegated to dedicated modules.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

[CmdletBinding()]
param(

    [switch]
    $Full,

    [switch]
    $SecurityOnly,

    [switch]
    $ToolkitOnly,

    [string]
    $Module,

    [string]
    $Category,

    [switch]
    $ReportOnly,

    [switch]
    $VerboseOutput
)

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

#------------------------------------------------------------------------------
# JustDefenders© Toolkit State
#------------------------------------------------------------------------------

$Script:Toolkit = [ordered]@{

    Name = "Engineering Validation Toolkit"

    Version = "1.1.0"

    Baseline = "ALPHA_BASELINE_20260701"

    Started = Get-Date

    Finished = $null

    RepositoryRoot = $null

    ValidationRoot = $PSScriptRoot

    ReportsPath = $null

    ExitCode = 1
}

#------------------------------------------------------------------------------
# JustDefenders© Repository Discovery
#------------------------------------------------------------------------------

function Get-JDRepositoryRoot
{
    [CmdletBinding()]
    param()

    $Current = $PSScriptRoot

    while ($true)
    {
        if (Test-Path (
            Join-Path $Current "package.json"
        ))
        {
            return $Current
        }

        $Parent = Split-Path `
            $Current `
            -Parent

        if($Parent -eq $Current)
        {
            throw (
                "Unable to locate the JustDefenders repository root."
            )
        }

        $Current = $Parent
    }
}

$Script:Toolkit.RepositoryRoot =
    Get-JDRepositoryRoot

$Script:Toolkit.ReportsPath =
    Join-Path `
        $PSScriptRoot `
        "Reports"

if(-not (
    Test-Path `
        -LiteralPath `
        $Script:Toolkit.ReportsPath
))
{
    New-Item `
        -ItemType Directory `
        -Path $Script:Toolkit.ReportsPath `
        -Force | Out-Null
}

#------------------------------------------------------------------------------
# JustDefenders© Validation Module Loading
#------------------------------------------------------------------------------

$RequiredModules = @(

    "Validation-Discovery.psm1",

    "Validation-Execution.psm1",

    "Validation-Reporting.psm1"
)

foreach($ModuleName in $RequiredModules)
{
    $ModulePath =
        Join-Path `
            $PSScriptRoot `
            $ModuleName

    if(-not (
        Test-Path `
            -LiteralPath `
            $ModulePath `
            -PathType Leaf
    ))
    {
        throw (
            "Required validation module missing: {0}" -f
            $ModuleName
        )
    }

    Import-Module `
        -Name $ModulePath `
        -Force `
        -ErrorAction Stop
}

#------------------------------------------------------------------------------
# JustDefenders© Validation Configuration
#------------------------------------------------------------------------------

$Configuration = [PSCustomObject]@{

    RepositoryRoot =
        $Script:Toolkit.RepositoryRoot

    ValidationRoot =
        $Script:Toolkit.ValidationRoot

    ReportsPath =
        $Script:Toolkit.ReportsPath

    Full =
        $Full.IsPresent

    SecurityOnly =
        $SecurityOnly.IsPresent

    ToolkitOnly =
        $ToolkitOnly.IsPresent

    Module =
        $Module

    Category =
        $Category

    ReportOnly =
        $ReportOnly.IsPresent

    Verbose =
        $VerboseOutput.IsPresent
}

#------------------------------------------------------------------------------
# JustDefenders© Validation Pipeline
#------------------------------------------------------------------------------

$Discovery =
    Get-JDValidationDiscovery `
        -Configuration $Configuration

if($null -eq $Discovery)
{
    throw "Validation discovery failed."
}

if($null -eq $Discovery.Targets)
{
    throw "Discovery returned no validation targets."
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# JustDefenders© Validation Execution
#------------------------------------------------------------------------------
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Validation\
# Invoke-EngineeringValidation.ps1
#
# Timestamp:
# 2nd July 2026 08:50
#------------------------------------------------------------------------------

$Execution =
    Invoke-JDValidationExecution `
        -Configuration $Configuration `
        -Targets $Discovery.Targets

if($null -eq $Execution)
{
    throw "Validation execution returned a null object."
}

#------------------------------------------------------------------------------
# JustDefenders© Execution Contract Validation
#------------------------------------------------------------------------------

$RequiredExecutionProperties = @(

    "Success",

    "TargetCount",

    "Executed",

    "Passed",

    "Failed",

    "Skipped",

    "Warnings",

    "Duration",

    "Results",

    "Failures",

    "Statistics"
)

foreach($Property in $RequiredExecutionProperties)
{
    if(-not (
        $Execution.PSObject.Properties.Name -contains $Property
    ))
    {
        throw (
            "Execution contract violation. Missing property '{0}'." -f
            $Property
        )
    }
}

#------------------------------------------------------------------------------
# JustDefenders© Validation Reporting
#------------------------------------------------------------------------------

$Report =
    Write-JDValidationReport `
        -Configuration $Configuration `
        -Discovery $Discovery `
        -ExecutionResult $Execution

if($null -eq $Report)
{
    throw "Validation reporting returned a null object."
}

#------------------------------------------------------------------------------
#

#------------------------------------------------------------------------------
# JustDefenders© Report Contract Validation
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Validation\
# Invoke-EngineeringValidation.ps1
#
# Timestamp:
# 2nd July 2026 08:50
#------------------------------------------------------------------------------

$RequiredReportProperties = @(

    "Report",

    "ConsoleOutput",

    "MarkdownReport",

    "JsonReport"
)

foreach($Property in $RequiredReportProperties)
{
    if(-not (
        $Report.PSObject.Properties.Name -contains $Property
    ))
    {
        throw (
            "Reporting contract violation. Missing property '{0}'." -f
            $Property
        )
    }
}

#------------------------------------------------------------------------------
# JustDefenders© Console Output
#------------------------------------------------------------------------------

if($Report.ConsoleOutput)
{
    foreach($Line in $Report.ConsoleOutput)
    {
        Write-Host $Line
    }
}

#------------------------------------------------------------------------------
# JustDefenders© Engineering Summary
#------------------------------------------------------------------------------

Write-Host ""
Write-Host "=========================================================="
Write-Host " JustDefenders Engineering Validation"
Write-Host "=========================================================="
Write-Host ""

Write-Host ("Targets Tested : {0}" -f $Execution.TargetCount)
Write-Host ("Executed      : {0}" -f $Execution.Executed)
Write-Host ("Passed        : {0}" -f $Execution.Passed)
Write-Host ("Failed        : {0}" -f $Execution.Failed)
Write-Host ("Skipped       : {0}" -f $Execution.Skipped)
Write-Host ("Warnings      : {0}" -f $Execution.Warnings)
Write-Host ("Duration      : {0}" -f $Execution.Duration)

Write-Host ""

if($Execution.Success)
{
    Write-Host "Overall Result : PASS"

    $Script:Toolkit.ExitCode = 0
}
else
{
    Write-Host "Overall Result : FAIL"

    $Script:Toolkit.ExitCode = 1
}

Write-Host ""

Write-Host ("Markdown Report : {0}" -f $Report.MarkdownReport)
Write-Host ("JSON Report     : {0}" -f $Report.JsonReport)

Write-Host ""

Write-Host "Engineering Baseline"
Write-Host $Script:Toolkit.Baseline

Write-Host "=========================================================="

#------------------------------------------------------------------------------
# JustDefenders© Return Object
#------------------------------------------------------------------------------

$Script:Toolkit.Finished = Get-Date

$ToolkitResult = [PSCustomObject]@{

    PSTypeName = "JustDefenders.Validation.Toolkit"

    Success = $Execution.Success

    Baseline = $Script:Toolkit.Baseline

    Started = $Script:Toolkit.Started

    Finished = $Script:Toolkit.Finished

    Duration = (
        $Script:Toolkit.Finished -
        $Script:Toolkit.Started
    )

    Discovery = $Discovery

    Execution = $Execution

    Report = $Report

    ExitCode = $Script:Toolkit.ExitCode
}

#------------------------------------------------------------------------------
# JustDefenders© Exit
#------------------------------------------------------------------------------

if($Script:Toolkit.ExitCode -eq 0)
{
    exit 0
}

exit 1

#------------------------------------------------------------------------------
# End of File
#------------------------------------------------------------------------------