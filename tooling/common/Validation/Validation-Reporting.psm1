<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Validation-Reporting.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Validation\
Validation-Reporting.psm1

Module:
Engineering Validation Reporting

Version:
1.0.0

Engineering Baseline:
ALPHA_BASELINE_20260701

Purpose

Provides canonical reporting for the JustDefenders Engineering
Validation Toolkit.

Responsibilities

    • Report Model Construction
    • Summary Generation
    • Console Rendering
    • Markdown Rendering
    • JSON Rendering

Execution and discovery are delegated to dedicated modules.

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

    Name = "Engineering Validation Reporting"

    Version = "1.0.0"

    Baseline = "ALPHA_BASELINE_20260701"

    Initialised = $true
}

#------------------------------------------------------------------------------
# Report Model
#------------------------------------------------------------------------------

function New-JDValidationReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $ExecutionResult
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Report"

        Name = "Engineering Validation"

        Baseline = $Script:Module.Baseline

        Version = $Script:Module.Version

        Generated = Get-Date

        Execution = $ExecutionResult

        Summary = $null

        Outputs = @()
    }
}

#------------------------------------------------------------------------------
# Summary Model
#------------------------------------------------------------------------------

function New-JDValidationSummary
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $ExecutionResult
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Summary"

        Success = $ExecutionResult.Success

        Targets = $ExecutionResult.Statistics.Targets

        Passed = $ExecutionResult.Statistics.Passed

        Failed = $ExecutionResult.Statistics.Failed

        Warnings = $ExecutionResult.Statistics.Warnings

        Duration = $ExecutionResult.Statistics.Duration

        Generated = Get-Date
    }
}

#------------------------------------------------------------------------------
# Report Output Object
#------------------------------------------------------------------------------

function New-JDValidationOutput
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateSet(
            "Console",
            "Markdown",
            "Json"
        )]
        [string]
        $Format,

        [Parameter(Mandatory)]
        [string]
        $Path
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Output"

        Format = $Format

        Path = $Path

        Generated = Get-Date
    }
}

#------------------------------------------------------------------------------
# Internal Formatting
#------------------------------------------------------------------------------

function Format-JDValidationSummary
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Summary
    )

    return @(
        "Targets : {0}" -f $Summary.Targets
        "Passed  : {0}" -f $Summary.Passed
        "Failed  : {0}" -f $Summary.Failed
        "Warnings: {0}" -f $Summary.Warnings
        "Duration: {0}" -f $Summary.Duration
    )
}

#------------------------------------------------------------------------------
# Report Construction
#------------------------------------------------------------------------------

function Build-JDValidationReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $ExecutionResult
    )

    $Report =
        New-JDValidationReport `
            -ExecutionResult $ExecutionResult

    $Report.Summary =
        New-JDValidationSummary `
            -ExecutionResult $ExecutionResult

    return $Report
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Render Context
#------------------------------------------------------------------------------

function New-JDRenderContext
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Report,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.RenderContext"

        Report = $Report

        Configuration = $Configuration

        ReportsPath = $Configuration.ReportsPath

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Internal Report Writer
#------------------------------------------------------------------------------

function Write-JDReportFile
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Path,

        [Parameter(Mandatory)]
        [string[]]
        $Content
    )

    $Directory = Split-Path `
        $Path `
        -Parent

    if(-not (Test-Path -LiteralPath $Directory))
    {
        New-Item `
            -ItemType Directory `
            -Path $Directory `
            -Force | Out-Null
    }

    $Content |
        Set-Content `
            -Path $Path `
            -Encoding UTF8

    return $Path
}

#------------------------------------------------------------------------------
# Console Renderer
#------------------------------------------------------------------------------

function Write-JDConsoleReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Context
    )

    $Summary =
        $Context.Report.Summary

    $Lines = @()

    $Lines += "=========================================================="
    $Lines += "JustDefenders Engineering Validation"
    $Lines += "=========================================================="
    $Lines += ""

    $Lines += Format-JDValidationSummary `
        -Summary $Summary

    $Lines += ""

    $Lines += (
        "Overall Result : {0}" -f
        $(if($Summary.Success){'PASS'}else{'FAIL'})
    )

    return $Lines
}

#------------------------------------------------------------------------------
# Markdown Renderer
#------------------------------------------------------------------------------

function Write-JDMarkdownReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Context
    )

    $Path =
        Join-Path `
            $Context.ReportsPath `
            "EngineeringValidation.md"

    $Lines = @()

    $Lines += "# JustDefenders Engineering Validation"
    $Lines += ""

    $Lines += ("Generated: {0}" -f (Get-Date))

    $Lines += ""

    $Lines += "## Summary"

    $Lines += ""

    foreach($Line in (
        Format-JDValidationSummary `
            -Summary $Context.Report.Summary
    ))
    {
        $Lines += "- $Line"
    }

    $Lines += ""

    $Lines += "## Module Results"

    $Lines += ""

    foreach($Result in
        $Context.Report.Execution.Results)
    {
        $Status =
            if($Result.Success)
            {
                "PASS"
            }
            else
            {
                "FAIL"
            }

        $Lines += (
    "- **{0}** - {1}" -f
    $Result.Name,
    $Status
)
    }

    Write-JDReportFile `
        -Path $Path `
        -Content $Lines

    return New-JDValidationOutput `
        -Format Markdown `
        -Path $Path
}

#------------------------------------------------------------------------------
# JSON Renderer
#------------------------------------------------------------------------------

function Write-JDJsonReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Context
    )

    $Path =
        Join-Path `
            $Context.ReportsPath `
            "EngineeringValidation.json"

    $Json =
        $Context.Report |
        ConvertTo-Json `
            -Depth 20

    Write-JDReportFile `
        -Path $Path `
        -Content @($Json)

    return New-JDValidationOutput `
        -Format Json `
        -Path $Path
}

#------------------------------------------------------------------------------
# Renderer Pipeline
#------------------------------------------------------------------------------

function Invoke-JDRenderPipeline
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Context
    )

    $Outputs = @()

    $Outputs +=
        Write-JDMarkdownReport `
            -Context $Context

    $Outputs +=
        Write-JDJsonReport `
            -Context $Context

    $Context.Report.Outputs = $Outputs

    return $Context.Report
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Report Orchestration
#------------------------------------------------------------------------------

function Write-JDValidationReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration,

        [Parameter(Mandatory)]
        [pscustomobject]
        $ExecutionResult
    )

    $Report =
        Build-JDValidationReport `
            -ExecutionResult $ExecutionResult

    $Context =
        New-JDRenderContext `
            -Report $Report `
            -Configuration $Configuration

    $ConsoleOutput =
        Write-JDConsoleReport `
            -Context $Context

    $MarkdownOutput =
        Write-JDMarkdownReport `
            -Context $Context

    $JsonOutput =
        Write-JDJsonReport `
            -Context $Context

    $Report.Outputs = @(
        $MarkdownOutput
        $JsonOutput
    )

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Report.Result"

        Report = $Report

        ConsoleOutput = $ConsoleOutput

        MarkdownReport = $MarkdownOutput.Path

        JsonReport = $JsonOutput.Path
    }
}

#------------------------------------------------------------------------------
# Reporting Diagnostics
#------------------------------------------------------------------------------

function Get-JDValidationReportingVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Reporting.Version"

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

function Test-JDValidationReporting
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        'Write-JDValidationReport',

        'Write-JDConsoleReport',

        'Write-JDMarkdownReport',

        'Write-JDJsonReport',

        'Get-JDValidationReportingVersion',

        'Test-JDValidationReporting'
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (Get-Command `
            $Function `
            -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Reporting.Validation"

        Success =
            ($Missing.Count -eq 0)

        FunctionCount =
            $RequiredFunctions.Count

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

    'Write-JDValidationReport',

    'Write-JDConsoleReport',

    'Write-JDMarkdownReport',

    'Write-JDJsonReport',

    'Get-JDValidationReportingVersion',

    'Test-JDValidationReporting'
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

Module:
Engineering Validation Reporting

Version:
1.0.0

Status:
Complete

Engineering Baseline:
ALPHA_BASELINE_20260701

===============================================================================
#>
