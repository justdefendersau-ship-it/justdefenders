<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Test-Framework.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Testing\
Test-Framework.psm1

Module:
Engineering Test Framework

Work Package:
WP-004.2.3

Engineering Baseline:
WP0042_ENGINEERING_TEST_FRAMEWORK_V120

Version:
1.2.0

Status:
Engineering Baseline

Purpose

Provides the canonical engineering testing framework used throughout the
JustDefenders Engineering Platform.

The framework supplies common registration, lifecycle management,
execution, assertions, reporting and diagnostics for engineering tests.

All engineering test suites utilise this framework rather than
implementing their own execution logic.

Responsibilities

    • Framework Initialisation
    • Test Registration
    • Lifecycle Management
    • Test Execution
    • Assertion Services
    • Result Collection
    • Report Generation
    • Framework Diagnostics
    • Integrity Validation

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module State
#------------------------------------------------------------------------------

$Script:Framework = [ordered]@{

    Name          = "Engineering Test Framework"

    Version       = "1.2.0"

    Baseline      = "WP0042_ENGINEERING_TEST_FRAMEWORK_V120"

    Initialised   = $false

    Loaded        = Get-Date
}

#------------------------------------------------------------------------------
# Framework Initialisation
#------------------------------------------------------------------------------

function Initialize-JDTestFramework
{
    [CmdletBinding()]
    param()

    $Script:Framework.Initialised = $true
}

#------------------------------------------------------------------------------
# Framework State
#------------------------------------------------------------------------------

$Script:RegisteredTests =
    New-Object System.Collections.ArrayList

$Script:ExecutionResults =
    New-Object System.Collections.ArrayList

$Script:LastReport = $null

#------------------------------------------------------------------------------
# Framework Lifecycle State
#------------------------------------------------------------------------------

$Script:LifecycleHooks = [ordered]@{

    BeforeAll  = $null

    AfterAll   = $null

    BeforeEach = $null

    AfterEach  = $null
}

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
        $Category = "General",

        [string]
        $Description = "",

        [string[]]
        $Tags = @()
    )

    $Existing =
        $Script:RegisteredTests |
        Where-Object Name -eq $Name

    if($Existing)
    {
        throw "A test named '$Name' is already registered."
    }

    $Test = [PSCustomObject]@{

        PSTypeName = "JustDefenders.Test"

        Name = $Name

        Category = $Category

        Description = $Description

        Tags = $Tags

        ScriptBlock = $ScriptBlock

        Registered = Get-Date
    }

    [void]$Script:RegisteredTests.Add($Test)

    return $Test
}

#------------------------------------------------------------------------------
# Test Unregistration
#------------------------------------------------------------------------------

function Unregister-JDTest
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $Test =
        $Script:RegisteredTests |
        Where-Object Name -eq $Name

    if($null -eq $Test)
    {
        return $false
    }

    [void]$Script:RegisteredTests.Remove($Test)

    return $true
}

#------------------------------------------------------------------------------
# Registered Test Discovery
#------------------------------------------------------------------------------

function Get-JDRegisteredTests
{
    [CmdletBinding()]
    param()

    return @($Script:RegisteredTests)
}

#------------------------------------------------------------------------------
# Test Registry Reset
#------------------------------------------------------------------------------

function Clear-JDTests
{
    [CmdletBinding()]
    param()

    $Script:RegisteredTests.Clear()

    $Script:ExecutionResults.Clear()

    $Script:LastReport = $null
}

#------------------------------------------------------------------------------
# Lifecycle Registration
#------------------------------------------------------------------------------

function Register-JDBeforeAll
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [scriptblock]
        $ScriptBlock
    )

    $Script:LifecycleHooks.BeforeAll = $ScriptBlock
}

function Register-JDAfterAll
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [scriptblock]
        $ScriptBlock
    )

    $Script:LifecycleHooks.AfterAll = $ScriptBlock
}

function Register-JDBeforeEach
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [scriptblock]
        $ScriptBlock
    )

    $Script:LifecycleHooks.BeforeEach = $ScriptBlock
}

function Register-JDAfterEach
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [scriptblock]
        $ScriptBlock
    )

    $Script:LifecycleHooks.AfterEach = $ScriptBlock
}

#------------------------------------------------------------------------------
# Lifecycle Reset
#------------------------------------------------------------------------------

function Clear-JDLifecycleHooks
{
    [CmdletBinding()]
    param()

    foreach($Key in $Script:LifecycleHooks.Keys)
    {
        $Script:LifecycleHooks[$Key] = $null
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Lifecycle Invocation
#------------------------------------------------------------------------------

function Invoke-JDLifecycleHook
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateSet(
            "BeforeAll",
            "AfterAll",
            "BeforeEach",
            "AfterEach"
        )]
        [string]
        $Hook,

        [AllowNull()]
        [object]
        $Context = $null
    )

    $ScriptBlock = $Script:LifecycleHooks[$Hook]

    if($null -eq $ScriptBlock)
    {
        return
    }

    if($PSBoundParameters.ContainsKey("Context"))
    {
        & $ScriptBlock $Context
    }
    else
    {
        & $ScriptBlock
    }
}

#------------------------------------------------------------------------------
# Assertion Helpers
#------------------------------------------------------------------------------

function Assert-JDTrue
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [bool]
        $Condition,

        [string]
        $Message = "Assertion failed."
    )

    if(-not $Condition)
    {
        throw $Message
    }
}

function Assert-JDFalse
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [bool]
        $Condition,

        [string]
        $Message = "Assertion failed."
    )

    if($Condition)
    {
        throw $Message
    }
}

function Assert-JDNotNull
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Value,

        [string]
        $Message = "Unexpected null."
    )

    if($null -eq $Value)
    {
        throw $Message
    }
}

function Assert-JDEquals
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Expected,

        [Parameter(Mandatory)]
        $Actual,

        [string]
        $Message = ""
    )

    if($Expected -ne $Actual)
    {
        if([string]::IsNullOrWhiteSpace($Message))
        {
            $Message =
                "Expected '$Expected' but received '$Actual'."
        }

        throw $Message
    }
}

#------------------------------------------------------------------------------
# Test Result Model
#------------------------------------------------------------------------------

function New-JDTestResult
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $TestCase,

        [Parameter(Mandatory)]
        [bool]
        $Passed,

        [Parameter(Mandatory)]
        [timespan]
        $Duration,

        [AllowNull()]
        $Output = $null,

        [AllowNull()]
        [System.Management.Automation.ErrorRecord]
        $ErrorRecord = $null
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Test.Result"

        Name = $TestCase.Name

        Category = $TestCase.Category

        Description = $TestCase.Description

        Tags = $TestCase.Tags

        Passed = $Passed

        Started = (Get-Date).Subtract($Duration)

        Finished = Get-Date

        Duration = $Duration

        Output = $Output

        ErrorRecord = $ErrorRecord

        Exception =
            if($ErrorRecord)
            {
                $ErrorRecord.Exception
            }
            else
            {
                $null
            }

        ExceptionType =
            if($ErrorRecord)
            {
                $ErrorRecord.Exception.GetType().FullName
            }
            else
            {
                $null
            }

        Message =
            if($Passed)
            {
                "PASS"
            }
            elseif($ErrorRecord)
            {
                $ErrorRecord.Exception.Message
            }
            else
            {
                "FAILED"
            }
    }
}

#------------------------------------------------------------------------------
# Execute Single Test
#------------------------------------------------------------------------------

function Invoke-JDTest
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $TestCase
    )

    $Timer =
        [System.Diagnostics.Stopwatch]::StartNew()

    $Passed = $true

    $Output = $null

    $ErrorRecord = $null

    try
    {
        Invoke-JDLifecycleHook `
            -Hook BeforeEach `
            -Context $TestCase

        $Output =
            & $TestCase.ScriptBlock
    }
    catch
    {
        $Passed = $false

        $ErrorRecord = $_
    }
    finally
    {
        try
        {
            Invoke-JDLifecycleHook `
                -Hook AfterEach `
                -Context $TestCase
        }
        catch
        {
            if($null -eq $ErrorRecord)
            {
                $Passed = $false

                $ErrorRecord = $_
            }
        }

        $Timer.Stop()
    }

    return New-JDTestResult `
        -TestCase $TestCase `
        -Passed $Passed `
        -Duration $Timer.Elapsed `
        -Output $Output `
        -ErrorRecord $ErrorRecord
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Test Report Model
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

    $ResultArray = @($Results)

    $Passed =
        @(
            $ResultArray |
            Where-Object Passed
        ).Count

    $Failed =
        @(
            $ResultArray |
            Where-Object { -not $_.Passed }
        ).Count

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Test.Report"

        Started =
            if($ResultArray.Count)
            {
                $ResultArray[0].Started
            }
            else
            {
                Get-Date
            }

        Finished = Get-Date

        Duration = $Duration

        Total = $ResultArray.Count

        Passed = $Passed

        Failed = $Failed

        Success = ($Failed -eq 0)

        Results = $ResultArray
    }
}

#------------------------------------------------------------------------------
# Execute Registered Tests
#------------------------------------------------------------------------------

function Invoke-JDTests
{
    [CmdletBinding()]
    param(

        [string]
        $Category,

        [string[]]
        $Tags
    )

    $Script:ExecutionResults.Clear()

    $FrameworkTimer =
        [System.Diagnostics.Stopwatch]::StartNew()

    $Tests = @($Script:RegisteredTests)

    if($PSBoundParameters.ContainsKey("Category"))
    {
        $Tests =
            $Tests |
            Where-Object Category -eq $Category
    }

    if($PSBoundParameters.ContainsKey("Tags"))
    {
        $Tests =
            $Tests |
            Where-Object {

                @(
                    $_.Tags |
                    Where-Object {
                        $Tags -contains $_
                    }
                ).Count -gt 0
            }
    }

    try
    {
        Invoke-JDLifecycleHook `
            -Hook BeforeAll `
            -Context $Tests

        foreach($Test in $Tests)
        {
            $Result =
                Invoke-JDTest `
                    -TestCase $Test

            [void]$Script:ExecutionResults.Add($Result)
        }
    }
    finally
    {
        try
        {
            Invoke-JDLifecycleHook `
                -Hook AfterAll `
                -Context $Script:ExecutionResults
        }
        finally
        {
            $FrameworkTimer.Stop()
        }
    }

    $Script:LastReport =
        New-JDTestReport `
            -Results $Script:ExecutionResults `
            -Duration $FrameworkTimer.Elapsed

    return $Script:LastReport
}

#------------------------------------------------------------------------------
# Report Access
#------------------------------------------------------------------------------

function Get-JDTestReport
{
    [CmdletBinding()]
    param()

    return $Script:LastReport
}

function Get-JDTestSummary
{
    [CmdletBinding()]
    param()

    if($null -eq $Script:LastReport)
    {
        return $null
    }

    return [PSCustomObject]@{

        Success = $Script:LastReport.Success

        Total = $Script:LastReport.Total

        Passed = $Script:LastReport.Passed

        Failed = $Script:LastReport.Failed

        Duration = $Script:LastReport.Duration

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Framework Diagnostics
#------------------------------------------------------------------------------

function Get-JDTestFrameworkVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name = $Script:Framework.Name

        Version = $Script:Framework.Version

        Baseline = $Script:Framework.Baseline

        Initialised = $Script:Framework.Initialised

        Timestamp = Get-Date
    }
}

function Get-JDTestFrameworkState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Test.Framework.State"

        Name = $Script:Framework.Name

        Version = $Script:Framework.Version

        Baseline = $Script:Framework.Baseline

        Initialised = $Script:Framework.Initialised

        RegisteredTests =
            $Script:RegisteredTests.Count

        LastExecution =
            if($Script:LastReport)
            {
                $Script:LastReport.Finished
            }
            else
            {
                $null
            }

        Hooks = [PSCustomObject]@{

            BeforeAll =
                ($null -ne $Script:LifecycleHooks.BeforeAll)

            AfterAll =
                ($null -ne $Script:LifecycleHooks.AfterAll)

            BeforeEach =
                ($null -ne $Script:LifecycleHooks.BeforeEach)

            AfterEach =
                ($null -ne $Script:LifecycleHooks.AfterEach)
        }

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Framework Integrity Validation
#------------------------------------------------------------------------------

function Test-JDTestFramework
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        "Register-JDTest"

        "Unregister-JDTest"

        "Get-JDRegisteredTests"

        "Clear-JDTests"

        "Register-JDBeforeAll"

        "Register-JDAfterAll"

        "Register-JDBeforeEach"

        "Register-JDAfterEach"

        "Clear-JDLifecycleHooks"

        "Invoke-JDTest"

        "Invoke-JDTests"

        "Get-JDTestReport"

        "Get-JDTestSummary"

        "Get-JDTestFrameworkState"

        "Get-JDTestFrameworkVersion"
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (Get-Command $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Test.Framework.Validation"

        Success =
            ($Missing.Count -eq 0)

        MissingFunctions =
            $Missing

        FunctionCount =
            $RequiredFunctions.Count

        RegisteredTests =
            $Script:RegisteredTests.Count

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Framework Reset
#------------------------------------------------------------------------------

function Reset-JDTestFramework
{
    [CmdletBinding()]
    param()

    Clear-JDTests

    Clear-JDLifecycleHooks

    $Script:LastReport = $null
}

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    # Framework

    'Get-JDTestFrameworkVersion',

    'Get-JDTestFrameworkState',

    'Test-JDTestFramework',

    'Reset-JDTestFramework',

    # Registration

    'Register-JDTest',

    'Unregister-JDTest',

    'Get-JDRegisteredTests',

    'Clear-JDTests',

    # Lifecycle

    'Register-JDBeforeAll',

    'Register-JDAfterAll',

    'Register-JDBeforeEach',

    'Register-JDAfterEach',

    'Clear-JDLifecycleHooks',

    # Assertions

    'Assert-JDTrue',

    'Assert-JDFalse',

    'Assert-JDNotNull',

    'Assert-JDEquals',

    # Execution

    'Invoke-JDTest',

    'Invoke-JDTests',

    # Results

    'Get-JDTestReport',

    'Get-JDTestSummary'
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDTestFramework

Write-Verbose (
    "{0} v{1} initialised successfully." -f `
    $Script:Framework.Name, `
    $Script:Framework.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering
===============================================================================

Module:
Engineering Test Framework

Work Package:
WP-004.2.3

Version:
1.2.0

Engineering Baseline:
WP0042_ENGINEERING_TEST_FRAMEWORK_V120

Status:
Engineering Baseline

Summary

The Engineering Test Framework provides the canonical testing
infrastructure for the JustDefenders Engineering Toolkit.

Capabilities include:

    • Test Registration
    • Lifecycle Hooks
    • Assertions
    • Test Execution
    • Result Collection
    • Report Generation
    • Framework Diagnostics
    • Integrity Validation

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
JustDefenders© 2026
===============================================================================
#>