<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Security-Foundation.Tests.ps1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Security\Foundation\Security-Foundation.Tests.ps1

Work Package:
WP-003F.1

Engineering Baseline:
ALPHA_BASELINE_20260701

Purpose:
Engineering self-test suite for the Security Foundation module.

The objective of this script is to validate that the Security Foundation
provides deterministic behaviour and satisfies the Alpha Engineering
Baseline before dependent security modules are implemented.

Compatible with:
Windows PowerShell 5.1

===============================================================================
#>

Set-StrictMode -Version Latest

$ModulePath = Join-Path $PSScriptRoot "Security-Foundation.psm1"

Import-Module $ModulePath -Force

$Script:Results = @()

# -----------------------------------------------------------------------------
# Test Helper
# -----------------------------------------------------------------------------

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

# -----------------------------------------------------------------------------
# Module Load Test
# -----------------------------------------------------------------------------

try
{
    $Version = Get-JDSecurityFoundationVersion

$Passed =
    ($Version.Version -eq "1.1.0") -and
    ($Version.Initialised -eq $true)

Add-TestResult `
    -Name "Module Version" `
    -Passed $Passed `
    -Message "Module loaded successfully."
}
catch
{
    Add-TestResult `
        -Name "Module Version" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Status Object Test
# -----------------------------------------------------------------------------

try
{
    $Status = New-JDSecurityStatus `
        -Name "Status Test" `
        -Result Pass

    Add-TestResult `
        -Name "Status Object" `
        -Passed (Test-JDSecurityStatus $Status) `
        -Message "Status object validation."
}
catch
{
    Add-TestResult `
        -Name "Status Object" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Exception Test
# -----------------------------------------------------------------------------

try
{
    $Exception = New-JDSecurityException `
        -Message "Test Exception"

    Add-TestResult `
        -Name "Security Exception" `
        -Passed ($Exception -is [System.Exception]) `
        -Message "Exception created."
}
catch
{
    Add-TestResult `
        -Name "Security Exception" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Secret Detection Test
# -----------------------------------------------------------------------------

try
{
    $Detected = Test-JDProtectedSecretName "JWT_SECRET"

    Add-TestResult `
        -Name "Protected Secret Detection" `
        -Passed $Detected `
        -Message "Secret detected."
}
catch
{
    Add-TestResult `
        -Name "Protected Secret Detection" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Continues...
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# Secret Redaction Test
# -----------------------------------------------------------------------------

try
{
    $Redacted = Protect-JDSecret `
        -Value "abcdefghijklmnopqrstuvwxyz123456"

    $Passed = (
        $Redacted -ne "abcdefghijklmnopqrstuvwxyz123456"
    ) -and (
        $Redacted.Length -gt 0
    )

    Add-TestResult `
        -Name "Secret Redaction" `
        -Passed $Passed `
        -Message "Secrets are masked."
}
catch
{
    Add-TestResult `
        -Name "Secret Redaction" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Hashtable Secret Protection
# -----------------------------------------------------------------------------

try
{
    $Input = @{
        JWT_SECRET = "abcdefghijklmnopqrstuvwxyz"
        USER_NAME  = "Simon"
    }

    $Output = Protect-JDHashtableSecrets $Input

    $Passed =
        ($Output.JWT_SECRET -ne $Input.JWT_SECRET) -and
        ($Output.USER_NAME -eq "Simon")

    Add-TestResult `
        -Name "Hashtable Secret Protection" `
        -Passed $Passed `
        -Message "Hashtable sanitisation successful."
}
catch
{
    Add-TestResult `
        -Name "Hashtable Secret Protection" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Security Event Test
# -----------------------------------------------------------------------------

try
{
    $Event = New-JDSecurityEvent `
        -Name "Unit Test" `
        -Category General `
        -Severity Information `
        -Message "Testing"

    Add-TestResult `
        -Name "Security Event" `
        -Passed (Test-JDSecurityEvent $Event) `
        -Message "Security event validated."
}
catch
{
    Add-TestResult `
        -Name "Security Event" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Assertion Tests
# -----------------------------------------------------------------------------

try
{
    $null = Assert-JDNotNull `
        -Value "Test" `
        -Name "Sample"

    $null = Assert-JDNotNullOrEmpty `
        -Value "Value" `
        -Name "Sample"

    $null = Assert-JDBoolean `
        -Value $true `
        -Name "Flag"

    Add-TestResult `
        -Name "Assertion Helpers" `
        -Passed $true `
        -Message "Assertions completed."
}
catch
{
    Add-TestResult `
        -Name "Assertion Helpers" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Environment Helper Test
# -----------------------------------------------------------------------------

try
{
    $Value = Get-JDEnvironmentVariable `
        -Name "PATH"

    $Passed = -not [string]::IsNullOrWhiteSpace($Value)

    Add-TestResult `
        -Name "Environment Helper" `
        -Passed $Passed `
        -Message "Environment helper operational."
}
catch
{
    Add-TestResult `
        -Name "Environment Helper" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Stopwatch Test
# -----------------------------------------------------------------------------

try
{
    $Timer = Start-JDSecurityTimer

    Start-Sleep -Milliseconds 10

    $Elapsed = Stop-JDSecurityTimer $Timer

    Add-TestResult `
        -Name "Security Timer" `
        -Passed ($Elapsed.TotalMilliseconds -gt 0) `
        -Message "Stopwatch operational."
}
catch
{
    Add-TestResult `
        -Name "Security Timer" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Module Integrity Test
# -----------------------------------------------------------------------------

try
{
    $Integrity = Test-JDSecurityFoundation

Add-TestResult `
    -Name "Module Integrity" `
    -Passed $Integrity.Success `
    -Message $Integrity.Message
}
catch
{
    Add-TestResult `
        -Name "Module Integrity" `
        -Passed $false `
        -Message $_.Exception.Message
}

# -----------------------------------------------------------------------------
# Test Summary
# -----------------------------------------------------------------------------

$Passed = @($Script:Results | Where-Object Passed).Count
$Failed = @($Script:Results | Where-Object { -not $_.Passed }).Count
$Total  = @($Script:Results).Count

# -----------------------------------------------------------------------------
# Validation Contract
# -----------------------------------------------------------------------------

$ValidationResult = [PSCustomObject]@{

    Name        = "Security Foundation"

    Version     = "1.0.0"

    WorkPackage = "WP-005.1.1"

    Baseline    = "WP00511_VALIDATION_CONTRACT_V100"

    Success     = ($Failed -eq 0)

    Total       = $Total

    Passed      = $Passed

    Failed      = $Failed

    Results     = $Script:Results

    Timestamp   = Get-Date
}

Write-Host ""
Write-Host "===================================================="
Write-Host " JustDefenders Security Foundation Test Results"
Write-Host "===================================================="
Write-Host ""

$Script:Results |
    Sort-Object Test |
    Out-Host

Write-Host ""
Write-Host ("Total Tests : {0}" -f $Total)
Write-Host ("Passed      : {0}" -f $Passed)
Write-Host ("Failed      : {0}" -f $Failed)
Write-Host ""

# -----------------------------------------------------------------------------
# Exit Code
# -----------------------------------------------------------------------------

if ($Failed -eq 0)
{
    Write-Host "WP-003F.1 Security Foundation Validation : PASS"
}
else
{
    Write-Error "WP-003F.1 Security Foundation Validation : FAIL"
}

return $ValidationResult

# -----------------------------------------------------------------------------
# End of File
# -----------------------------------------------------------------------------

<#
===============================================================================
JustDefenders©

Security Foundation Self-Test

Work Package:
WP-003F.1

Engineering Baseline:
ALPHA_BASELINE_20260701

Status:
Complete

===============================================================================
#>