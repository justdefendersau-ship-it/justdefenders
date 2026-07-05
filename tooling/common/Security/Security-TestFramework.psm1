<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Test-Framework.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Testing\Test-Framework.psm1

Module:
Engineering Test Framework

Work Package:
WP-003F.1A

Engineering Baseline:
ALPHA_BASELINE_20260701

Version:
1.0.0

Purpose:
Provides the shared engineering testing framework used throughout the
JustDefenders platform.

This framework supplies the common execution engine for engineering tests.

Individual test files register test cases with this framework rather than
implementing their own execution logic.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module State
#------------------------------------------------------------------------------

$Script:FrameworkVersion = '1.0.0'

$Script:RegisteredTests = New-Object System.Collections.ArrayList

$Script:TestResults = New-Object System.Collections.ArrayList

#------------------------------------------------------------------------------
# Test Registration
#------------------------------------------------------------------------------

function Register-JDTest
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [scriptblock]
        $ScriptBlock,

        [string]
        $Category = 'General'
    )

    $null = $Script:RegisteredTests.Add(

        [PSCustomObject]@{

            Name       = $Name

            Category   = $Category

            Script     = $ScriptBlock

            Registered = Get-Date
        }

    )
}

#------------------------------------------------------------------------------
# Assertion Helpers
#------------------------------------------------------------------------------

function Assert-JDTrue
{
    param(
        [bool]$Condition,

        [string]$Message = "Assertion failed."
    )

    if (-not $Condition)
    {
        throw $Message
    }
}

function Assert-JDFalse
{
    param(
        [bool]$Condition,

        [string]$Message = "Assertion failed."
    )

    if ($Condition)
    {
        throw $Message
    }
}

function Assert-JDNotNull
{
    param(
        $Value,

        [string]$Message = "Unexpected null."
    )

    if ($null -eq $Value)
    {
        throw $Message
    }
}

function Assert-JDEquals
{
    param(
        $Expected,

        $Actual,

        [string]$Message = ""
    )

    if ($Expected -ne $Actual)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = "Expected '$Expected' but received '$Actual'."
        }

        throw $Message
    }
}

#------------------------------------------------------------------------------
# Test Result Constructor
#------------------------------------------------------------------------------

function New-JDTestResult
{
    param(

        [string]$Name,

        [string]$Category,

        [bool]$Passed,

        [string]$Message,

        [timespan]$Duration
    )

    [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Test.Result'

        Timestamp  = Get-Date

        Name       = $Name

        Category   = $Category

        Passed     = $Passed

        Message    = $Message

        Duration   = $Duration
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Test Execution Engine
#------------------------------------------------------------------------------

function Invoke-JDTests
{
    [CmdletBinding()]
    param()

    $Script:TestResults.Clear()

    $FrameworkTimer = [System.Diagnostics.Stopwatch]::StartNew()

    foreach ($Test in $Script:RegisteredTests)
    {
        $Timer = [System.Diagnostics.Stopwatch]::StartNew()

        $Passed = $true
        $Message = "PASS"

        try
        {
            & $Test.Script
        }
        catch
        {
            $Passed = $false
            $Message = $_.Exception.Message
        }

        $Timer.Stop()

        $null = $Script:TestResults.Add(

            New-JDTestResult `
                -Name $Test.Name `
                -Category $Test.Category `
                -Passed $Passed `
                -Message $Message `
                -Duration $Timer.Elapsed
        )
    }

    $FrameworkTimer.Stop()

    return New-JDTestReport `
        -Results $Script:TestResults `
        -Duration $FrameworkTimer.Elapsed
}

#------------------------------------------------------------------------------
# Test Report
#------------------------------------------------------------------------------

function New-JDTestReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Results,

        [Parameter(Mandatory)]
        [timespan]
        $Duration
    )

    $Passed = @($Results | Where-Object Passed).Count
    $Failed = @($Results | Where-Object { -not $_.Passed }).Count
    $Total  = @($Results).Count

    [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Test.Report'

        Timestamp  = Get-Date

        Framework  = $Script:FrameworkVersion

        Duration   = $Duration

        Total      = $Total

        Passed     = $Passed

        Failed     = $Failed

        Success    = ($Failed -eq 0)

        Results    = $Results
    }
}

#------------------------------------------------------------------------------
# Console Report
#------------------------------------------------------------------------------

function Show-JDTestReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Report
    )

    Write-Host ""
    Write-Host "=============================================================="
    Write-Host " JustDefenders Engineering Test Framework"
    Write-Host "=============================================================="
    Write-Host ""

    $Report.Results |
        Sort-Object Category, Name |
        Format-Table `
            Category,
            Name,
            Passed,
            Duration `
            -AutoSize

    Write-Host ""
    Write-Host ("Framework : {0}" -f $Report.Framework)
    Write-Host ("Tests     : {0}" -f $Report.Total)
    Write-Host ("Passed    : {0}" -f $Report.Passed)
    Write-Host ("Failed    : {0}" -f $Report.Failed)
    Write-Host ("Duration  : {0}" -f $Report.Duration)

    if ($Report.Success)
    {
        Write-Host ""
        Write-Host "Overall Result : PASS"
    }
    else
    {
        Write-Host ""
        Write-Host "Overall Result : FAIL"
    }
}

#------------------------------------------------------------------------------
# JSON Export
#------------------------------------------------------------------------------

function Export-JDTestReportJson
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Report,

        [Parameter(Mandatory)]
        [string]
        $Path
    )

    $Report |
        ConvertTo-Json -Depth 20 |
        Set-Content `
            -Encoding UTF8 `
            -Path $Path
}

#------------------------------------------------------------------------------
# Markdown Export
#------------------------------------------------------------------------------

function Export-JDTestReportMarkdown
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Report,

        [Parameter(Mandatory)]
        [string]
        $Path
    )

    $Markdown = @()

    $Markdown += "# JustDefenders Engineering Test Report"
    $Markdown += ""
    $Markdown += "| Metric | Value |"
    $Markdown += "|--------|------:|"
    $Markdown += "| Tests | $($Report.Total) |"
    $Markdown += "| Passed | $($Report.Passed) |"
    $Markdown += "| Failed | $($Report.Failed) |"
    $Markdown += "| Duration | $($Report.Duration) |"
    $Markdown += ""

    $Markdown += "## Results"
    $Markdown += ""

    foreach ($Result in $Report.Results)
    {
        $Status = if ($Result.Passed) { "PASS" } else { "FAIL" }

        $Markdown += "- **$($Result.Name)** ($($Result.Category)) : $Status"
    }

    $Markdown |
        Set-Content `
            -Encoding UTF8 `
            -Path $Path
}

#------------------------------------------------------------------------------
# Framework Reset
#------------------------------------------------------------------------------

function Reset-JDTestFramework
{
    [CmdletBinding()]
    param()

    $Script:RegisteredTests.Clear()

    $Script:TestResults.Clear()
}

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    'Register-JDTest',

    'Invoke-JDTests',

    'Show-JDTestReport',

    'Export-JDTestReportJson',

    'Export-JDTestReportMarkdown',

    'Reset-JDTestFramework',

    'Assert-JDTrue',

    'Assert-JDFalse',

    'Assert-JDNotNull',

    'Assert-JDEquals'
)

Write-Verbose (
    "Engineering Test Framework v{0} loaded." -f
    $Script:FrameworkVersion
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders©

Engineering Test Framework

Version:
1.0.0

Status:
Complete

Work Package:
WP-003F.1A

Engineering Baseline:
ALPHA_BASELINE_20260701

===============================================================================
#>

