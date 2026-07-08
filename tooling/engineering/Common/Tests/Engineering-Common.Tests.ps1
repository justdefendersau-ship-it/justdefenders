<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
C:\dev\justdefenders\frontend\tooling\engineering\Common\Tests\
Engineering-Common.Tests.ps1

Work Package:
WP-C001

Purpose:
Validation suite for Engineering-Common.psm1

Timestamp:
08 July 2026 15:00 AEST
===============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

$Script:Results = @()

#------------------------------------------------------------------------------
# Test Helper
#------------------------------------------------------------------------------

function Add-TestResult
{
    param
    (
        [string]$Name,

        [bool]$Passed,

        [string]$Message
    )

    $Script:Results += [PSCustomObject]@{

        Test      = $Name

        Passed    = $Passed

        Message   = $Message

        Timestamp = Get-Date

    }
}

#------------------------------------------------------------------------------
# Import Module
#------------------------------------------------------------------------------

Import-Module `
    "$PSScriptRoot\..\Engineering-Common.psm1" `
    -Force

#------------------------------------------------------------------------------
# Module Import Test
#------------------------------------------------------------------------------

try
{
    $Module =
        Get-Module Engineering-Common

    Add-TestResult `
        -Name "Module Import" `
        -Passed ($null -ne $Module) `
        -Message "Module imported successfully."
}
catch
{
    Add-TestResult `
        -Name "Module Import" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Version Test
#------------------------------------------------------------------------------

try
{
    $Version =
        Get-JDEngineeringVersion

    Add-TestResult `
        -Name "Version" `
        -Passed (
            $Version.Version -eq "1.0.0"
        ) `
        -Message "Version object returned."
}
catch
{
    Add-TestResult `
        -Name "Version" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Context Test
#------------------------------------------------------------------------------

try
{
    $Context =
        New-JDEngineeringContext

    Add-TestResult `
        -Name "Context" `
        -Passed (
            Assert-JDEngineeringContext $Context
        ) `
        -Message "Context validation successful."
}
catch
{
    Add-TestResult `
        -Name "Context" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# END PART 1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Result Object Test
#------------------------------------------------------------------------------

try
{
    $Result =
        New-JDEngineeringResult `
            -Success $true `
            -Message "Unit Test"

    Add-TestResult `
        -Name "Result Object" `
        -Passed (
            Assert-JDEngineeringResult $Result
        ) `
        -Message "Result object validation successful."
}
catch
{
    Add-TestResult `
        -Name "Result Object" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Statistics Test
#------------------------------------------------------------------------------

try
{
    $Statistics =
        New-JDEngineeringStatistics

    Add-TestResult `
        -Name "Statistics" `
        -Passed (
            $Statistics.FilesScanned -eq 0 -and
            $Statistics.FilesModified -eq 0
        ) `
        -Message "Statistics initialised successfully."
}
catch
{
    Add-TestResult `
        -Name "Statistics" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Timer Test
#------------------------------------------------------------------------------

try
{
    $Timer =
        Start-JDEngineeringTimer

    Start-Sleep -Milliseconds 20

    $Elapsed =
        Stop-JDEngineeringTimer `
            -Timer $Timer

    Add-TestResult `
        -Name "Timer" `
        -Passed (
            $Elapsed.TotalMilliseconds -gt 0
        ) `
        -Message "Timer operational."
}
catch
{
    Add-TestResult `
        -Name "Timer" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Logging Test
#------------------------------------------------------------------------------

try
{
    Write-JDEngineeringLog `
        -Level Information `
        -Message "Engineering logging unit test."

    Add-TestResult `
        -Name "Logging" `
        -Passed $true `
        -Message "Logging executed successfully."
}
catch
{
    Add-TestResult `
        -Name "Logging" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Registry Test
#------------------------------------------------------------------------------

try
{
    Register-JDEngineeringModule `
        -Name "UnitTestModule" `
        -Version "1.0.0" `
        -WorkPackage "WP-TEST" `
        -Description "Engineering Common unit test." |
        Out-Null

    $Registered =
        Get-JDEngineeringModules |
        Where-Object {
            $_.Name -eq "UnitTestModule"
        }

    Add-TestResult `
        -Name "Registry" `
        -Passed ($null -ne $Registered) `
        -Message "Module registration successful."
}
catch
{
    Add-TestResult `
        -Name "Registry" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# END PART 2
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Lifecycle Test
#------------------------------------------------------------------------------

try
{
    $Context =
        Initialize-JDEngineeringModule `
            -ModuleName "EngineeringCommonTest" `
            -WorkPackage "WP-C001"

    Start-Sleep -Milliseconds 10

    $Context =
        Complete-JDEngineeringModule `
            -Context $Context `
            -Success $true

    Add-TestResult `
        -Name "Lifecycle" `
        -Passed (
            $Context.Success -and
            $Context.Duration.TotalMilliseconds -gt 0
        ) `
        -Message "Module lifecycle completed successfully."
}
catch
{
    Add-TestResult `
        -Name "Lifecycle" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Module Validation Test
#------------------------------------------------------------------------------

try
{
    $Validation =
        Test-JDEngineeringModule

    Add-TestResult `
        -Name "Module Validation" `
        -Passed $Validation.Success `
        -Message "Engineering module validation completed."
}
catch
{
    Add-TestResult `
        -Name "Module Validation" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Export Verification Test
#------------------------------------------------------------------------------

try
{
    $Expected = @(
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

    $Exported =
        (Get-Command -Module Engineering-Common).Name

    $Missing = @(
    $Expected |
    Where-Object {
        $_ -notin $Exported
    }
)

    if ($Missing.Count -eq 0)
    {
        $Message = "All expected exports verified."
        $Passed = $true
    }
    else
    {
        $Message = "Missing exports: $($Missing -join ', ')"
        $Passed = $false
    }

    Add-TestResult `
        -Name "Export Verification" `
        -Passed $Passed `
        -Message $Message
}
catch
{
    Add-TestResult `
        -Name "Export Verification" `
        -Passed $false `
        -Message $_.Exception.Message
}

#------------------------------------------------------------------------------
# Test Summary
#------------------------------------------------------------------------------

$Passed =
    @(
        $Script:Results |
        Where-Object Passed
    ).Count

$Failed =
    @(
        $Script:Results |
        Where-Object {
            -not $_.Passed
        }
    ).Count

Write-Host ""
Write-Host "===================================================="
Write-Host " JustDefenders Engineering Common Test Results"
Write-Host "===================================================="
Write-Host ""

$Script:Results |
    Format-Table `
        Test,
        Passed,
        Message,
        Timestamp `
        -AutoSize

Write-Host ""
Write-Host ("Total Tests : {0}" -f $Script:Results.Count)
Write-Host ("Passed      : {0}" -f $Passed)
Write-Host ("Failed      : {0}" -f $Failed)
Write-Host ""

if ($Failed -eq 0)
{
    Write-Host "WP-C001 Engineering Common Validation : PASS" `
        -ForegroundColor Green
}
else
{
    Write-Error "WP-C001 Engineering Common Validation : FAIL"
}

#------------------------------------------------------------------------------
# END OF FILE
#------------------------------------------------------------------------------

