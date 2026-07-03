<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Validation-Pipeline.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Validation\
Validation-Pipeline.psm1

Module:
Engineering Validation Pipeline

Version:
1.1.0

Work Package:
WP-003E.5

Engineering Baseline:
WP003E5_VALIDATION_PIPELINE_V110

Timestamp:
3rd July 2026, 12:50 AEST

Purpose

Orchestrates the JustDefenders Validation Framework by coordinating
the Validation Discovery, Validation Execution and Validation Reporting
engines into a single deterministic validation workflow.

Responsibilities

    • Pipeline Configuration
    • Discovery Orchestration
    • Execution Orchestration
    • Reporting Orchestration
    • Pipeline Diagnostics
    • End-to-End Validation

The Pipeline module contains orchestration logic only.

Discovery, execution and reporting responsibilities remain delegated
to their respective engineering modules.

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

    Name = "Engineering Validation Pipeline"

    Version = "1.1.0"

    Baseline = "WP003E5_VALIDATION_PIPELINE_V110"

    Initialised = $true
}

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module State
#------------------------------------------------------------------------------

$Script:Module = [ordered]@{

    Name = "Engineering Validation Pipeline"

    Version = "1.1.0"

    Baseline = "WP003E5_VALIDATION_PIPELINE_V110"

    Initialised = $true
}

#------------------------------------------------------------------------------
# Validation Discovery
#------------------------------------------------------------------------------

function Invoke-JDDiscoveryStage
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Pipeline
    )

    $Pipeline.Discovery =
        Get-JDValidationDiscovery `
            -Configuration $Pipeline.Configuration

    return $Pipeline.Discovery
}

#------------------------------------------------------------------------------
# Validation Execution
#------------------------------------------------------------------------------

function Invoke-JDExecutionStage
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Pipeline
    )

    $Pipeline.Execution =
    Invoke-JDValidationExecution `
        -Configuration $Pipeline.Configuration `
        -Targets $Pipeline.Discovery

    return $Pipeline.Execution
}

#------------------------------------------------------------------------------
# Validation Reporting
#------------------------------------------------------------------------------

function Invoke-JDReportingStage
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Pipeline
    )

    $Pipeline.Report =
    Write-JDValidationReport `
        -Configuration $Pipeline.Configuration `
        -ExecutionResult $Pipeline.Execution

    return $Pipeline.Report
}

#------------------------------------------------------------------------------
# Pipeline Completion
#------------------------------------------------------------------------------

function Complete-JDValidationPipeline
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Pipeline
    )

    $Pipeline.Success =
        $Pipeline.Report.Success

    $Pipeline.Finished =
        Get-Date

    return $Pipeline
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Validation Pipeline
#------------------------------------------------------------------------------

function Invoke-JDValidationPipeline
{
    [CmdletBinding()]
    param(

        [string]
        $Module,

        [string]
        $Category,

        [switch]
        $SecurityOnly,

        [switch]
        $ToolkitOnly
    )

    $Pipeline =
        New-JDValidationPipeline

    $Configuration =
        New-JDPipelineConfiguration `
            -Module $Module `
            -Category $Category `
            -SecurityOnly:$SecurityOnly `
            -ToolkitOnly:$ToolkitOnly

    Initialize-JDValidationPipeline `
        -Pipeline $Pipeline `
        -Configuration $Configuration | Out-Null

    Invoke-JDDiscoveryStage `
        -Pipeline $Pipeline | Out-Null

    Invoke-JDExecutionStage `
        -Pipeline $Pipeline | Out-Null

    Invoke-JDReportingStage `
        -Pipeline $Pipeline | Out-Null

    Complete-JDValidationPipeline `
        -Pipeline $Pipeline | Out-Null

    return $Pipeline.Report
}

#------------------------------------------------------------------------------
# Module Version
#------------------------------------------------------------------------------

function Get-JDValidationPipelineVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Module =
            $Script:Module.Name

        Version =
            $Script:Module.Version

        Baseline =
            $Script:Module.Baseline
    }
}

#------------------------------------------------------------------------------
# Engineering Validation
#------------------------------------------------------------------------------

function Test-JDValidationPipeline
{
    [CmdletBinding()]
    param()

    $Functions = @(

        "Invoke-JDValidationPipeline"

        "Get-JDValidationPipelineVersion"

        "Test-JDValidationPipeline"
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
# Module Exports
#------------------------------------------------------------------------------

Export-ModuleMember `
    -Function `
        Invoke-JDValidationPipeline,
        Get-JDValidationPipelineVersion,
        Test-JDValidationPipeline