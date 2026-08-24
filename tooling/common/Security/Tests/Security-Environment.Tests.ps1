<#
===============================================================================
JustDefendersÂ© Engineering
===============================================================================

File:
Security-Environment.Tests.ps1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Security\Tests\Security-Environment.Tests.ps1

Module:
Security Environment Validation

Work Package:
WP-003F.2

Engineering Baseline:
ALPHA_BASELINE_20260701

Version:
1.0.0

Purpose

Engineering validation suite for the Security Environment module.

Dependencies

â€¢ Security-Foundation.psm1
â€¢ Security-Environment.psm1
â€¢ Test-Framework.psm1
â€¢ Test-Assertions.psm1

Compatible With

â€¢ Windows PowerShell 5.1
â€¢ PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Repository Resolution
#------------------------------------------------------------------------------

$SecurityRoot = (Resolve-Path (
    Join-Path $PSScriptRoot ".."
)).Path

$RepositoryRoot = (Resolve-Path (
    Join-Path $SecurityRoot "..\..\.."
)).Path

$TestingRoot = Join-Path `
    $RepositoryRoot `
    "tooling\common\Testing"

#------------------------------------------------------------------------------
# Import Modules
#------------------------------------------------------------------------------

Import-Module (
    Join-Path $SecurityRoot "Foundation\Security-Foundation.psm1"
) -Force -ErrorAction Stop

Import-Module (
    Join-Path $SecurityRoot "Security-Environment.psm1"
) -Force -ErrorAction Stop

Import-Module (
    Join-Path $TestingRoot "Test-Framework.psm1"
) -Force -ErrorAction Stop

Import-Module (
    Join-Path $TestingRoot "Test-Assertions.psm1"
) -Force -ErrorAction Stop

#------------------------------------------------------------------------------
# Test Framework Isolation
#------------------------------------------------------------------------------
#
# The framework is imported with -Force immediately above, which creates a
# fresh module state for this test process. Do not invoke Reset-JDTestFramework
# here: its lifecycle cleanup enumerates LifecycleHooks.Keys while assigning
# values through the same ordered dictionary, which causes PowerShell/.NET
# enumeration invalidation in the current framework implementation.
#
# This test suite therefore relies on the freshly imported framework state
# and does not alter the framework implementation itself.
#
#------------------------------------------------------------------------------
# Environment Test Isolation
#------------------------------------------------------------------------------

$OriginalEnvironmentValues = @{}

$WP003F2TestVariables = @(
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'ASPNETCORE_ENVIRONMENT',
    'API_BASE_URL',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_KEY',
    'NEXT_PUBLIC_API_BASE_URL',
    'NODE_ENV',
    'JWT_SECRET',
    'NEXTAUTH_SECRET'
)

foreach($Name in $WP003F2TestVariables)
{
    $OriginalEnvironmentValues[$Name] =
        [Environment]::GetEnvironmentVariable($Name)
}

function Set-WP003F2Environment
{
    param(
        [hashtable]$Values
    )

    foreach($Name in $WP003F2TestVariables)
    {
        [Environment]::SetEnvironmentVariable($Name, $null)
    }

    foreach($Entry in $Values.GetEnumerator())
    {
        [Environment]::SetEnvironmentVariable(
            $Entry.Key,
            [string]$Entry.Value
        )
    }
}

function Restore-WP003F2Environment
{
    foreach($Entry in $OriginalEnvironmentValues.GetEnumerator())
    {
        [Environment]::SetEnvironmentVariable(
            $Entry.Key,
            $Entry.Value
        )
    }
}

function New-WP003F2ValidEnvironment
{
    return @{
        NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
        NEXT_PUBLIC_SUPABASE_ANON_KEY = ('A' * 32)
        SUPABASE_SERVICE_ROLE_KEY = ('B' * 32)
        ASPNETCORE_ENVIRONMENT = 'Test'
        API_BASE_URL = 'https://api.example.test'
    }
}


#------------------------------------------------------------------------------
# Registered-Test Execution Scope Bootstrap
#------------------------------------------------------------------------------
#
# WP-003F.2: Test-Framework executes registered test ScriptBlocks from the
# Test-Framework module scope. The production/test dependencies and WP-003F.2
# helper functions must therefore be established in that same scope.
#
# Test-Framework.psm1 remains unchanged. This bootstrap only establishes the
# dependencies required by this authorised test suite in the framework's
# existing execution scope.
#
$FrameworkModule = Get-Module Test-Framework -ErrorAction Stop

& $FrameworkModule {
    param(
        $SecurityRoot,
        $TestingRoot,
        $RepositoryRoot,
        $OriginalEnvironmentValues,
        $WP003F2TestVariables
    )

    Set-Variable -Name "WP003F2SecurityRoot" -Scope Global -Value $SecurityRoot -Force
    Set-Variable -Name "WP003F2TestingRoot" -Scope Global -Value $TestingRoot -Force
    Set-Variable -Name "WP003F2RepositoryRoot" -Scope Global -Value $RepositoryRoot -Force
    Set-Variable -Name "OriginalEnvironmentValues" -Scope Global -Value $OriginalEnvironmentValues -Force
    Set-Variable -Name "WP003F2TestVariables" -Scope Global -Value $WP003F2TestVariables -Force

    Import-Module (
        Join-Path $SecurityRoot "Foundation\Security-Foundation.psm1"
    ) -Global -Force -ErrorAction Stop

    Import-Module (
        Join-Path $SecurityRoot "Security-Environment.psm1"
    ) -Global -Force -ErrorAction Stop

    Import-Module (
        Join-Path $TestingRoot "Test-Assertions.psm1"
    ) -Global -Force -ErrorAction Stop

    function global:Set-WP003F2Environment
    {
        param(
            [hashtable]$Values
        )

        foreach($Name in $WP003F2TestVariables)
        {
            [Environment]::SetEnvironmentVariable($Name, $null)
        }

        foreach($Entry in $Values.GetEnumerator())
        {
            [Environment]::SetEnvironmentVariable(
                $Entry.Key,
                [string]$Entry.Value
            )
        }
    }

    function global:Restore-WP003F2Environment
    {
        foreach($Entry in $OriginalEnvironmentValues.GetEnumerator())
        {
            [Environment]::SetEnvironmentVariable(
                $Entry.Key,
                $Entry.Value
            )
        }
    }

    function global:New-WP003F2ValidEnvironment
    {
        return @{
            NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
            NEXT_PUBLIC_SUPABASE_ANON_KEY = ('A' * 32)
            SUPABASE_SERVICE_ROLE_KEY = ('B' * 32)
            ASPNETCORE_ENVIRONMENT = 'Test'
            API_BASE_URL = 'https://api.example.test'
        }
    }

    Set-Variable -Name "RepositoryRoot" -Scope Global -Value $RepositoryRoot -Force
} $SecurityRoot $TestingRoot $RepositoryRoot $OriginalEnvironmentValues $WP003F2TestVariables

#------------------------------------------------------------------------------
# Test Framework Isolation
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Security Foundation Imports" `
    -Category "Import" `
    -Description "Security Foundation module imports successfully." `
    -Tags @("Import","Foundation","WP-003F.2") `
    -ScriptBlock {

        $FoundationPath = Join-Path `
            $WP003F2SecurityRoot `
            "Foundation\Security-Foundation.psm1"

        Import-Module `
            $FoundationPath `
            -Force `
            -Prefix "Foundation" `
            -ErrorAction Stop

        Assert-JDNotNull (
            Get-Command `
                Get-FoundationJDSecurityFoundationVersion `
                -ErrorAction Stop
        )
    }

Register-JDTest `
    -Name "Security Environment Imports" `
    -Category "Import" `
    -Description "Security Environment module imports successfully." `
    -Tags @("Import","Environment","WP-003F.2") `
    -ScriptBlock {

        Assert-JDNotNull (
            Get-Command `
                Get-JDEnvironment `
                -ErrorAction Stop
        )
    }

Register-JDTest `
    -Name "Testing Framework Imports" `
    -Category "Import" `
    -Description "Engineering Test Framework imports successfully." `
    -Tags @("Import","Framework","WP-003F.2") `
    -ScriptBlock {

        Assert-JDNotNull (
            Get-Command `
                Register-JDTest `
                -ErrorAction Stop
        )
    }

Register-JDTest `
    -Name "Assertions Import" `
    -Category "Import" `
    -Description "Assertion library imports successfully." `
    -Tags @("Import","Assertions","WP-003F.2") `
    -ScriptBlock {

        Assert-JDNotNull (
            Get-Command `
                Assert-JDTrue `
                -ErrorAction Stop
        )
    }

#------------------------------------------------------------------------------
# Environment Detection
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Environment Object Returned" `
    -Category "Environment" `
    -Description "Get-JDEnvironment returns a canonical environment object." `
    -Tags @("Environment","WP-003F.2") `
    -ScriptBlock {

        $Environment = Get-JDEnvironment

        Assert-JDNotNull $Environment

        Assert-JDHasProperty `
            -Object $Environment `
            -Property "Name"

        Assert-JDHasProperty `
            -Object $Environment `
            -Property "Definition"
    }

Register-JDTest `
    -Name "Environment Name Valid" `
    -Category "Environment" `
    -Description "Environment name is one of the supported environments." `
    -Tags @("Environment","WP-003F.2") `
    -ScriptBlock {

        $Environment = Get-JDEnvironment

        $Supported = @(
            "Development",
            "Test",
            "Staging",
            "Production"
        )

        Assert-JDContains `
            -Value ($Supported -join ",") `
            -Substring $Environment.Name
    }

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Environment Variable Validation
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Environment Validation Returns Collection" `
    -Category "Environment Variables" `
    -Description "Environment validation returns a collection of SecurityStatus objects." `
    -Tags @("Environment","Validation","WP-003F.2") `
    -ScriptBlock {

        $Result = Test-JDSecurityEnvironment

        Assert-JDNotNull $Result

        Assert-JDNotEmpty $Result
    }

Register-JDTest `
    -Name "Environment Status Objects Are Canonical" `
    -Category "Environment Variables" `
    -Description "Environment validation returns canonical security objects." `
    -Tags @("Environment","Canonical","WP-003F.2") `
    -ScriptBlock {

        foreach($Status in (Test-JDSecurityEnvironment))
        {
            Assert-JDContains `
                -Value ($Status.PSObject.TypeNames -join ",") `
                -Substring "JustDefenders.Security.Status"

            Assert-JDHasProperty `
                -Object $Status `
                -Property "Name"

            Assert-JDHasProperty `
                -Object $Status `
                -Property "Result"

            Assert-JDHasProperty `
                -Object $Status `
                -Property "Category"
        }
    }

#------------------------------------------------------------------------------
# Runtime Validation
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Runtime Validation Executes" `
    -Category "Runtime" `
    -Description "Runtime validation completes successfully." `
    -Tags @("Runtime","WP-003F.2") `
    -ScriptBlock {

        $Runtime = Test-JDRuntime

        Assert-JDNotNull $Runtime

        Assert-JDNotEmpty $Runtime
    }

Register-JDTest `
    -Name "PowerShell Version Detected" `
    -Category "Runtime" `
    -Description "PowerShell version is reported." `
    -Tags @("Runtime","PowerShell","WP-003F.2") `
    -ScriptBlock {

        $Runtime = Test-JDRuntime

        $Version = $Runtime |
            Where-Object Name -eq "PowerShell Version"

        Assert-JDNotNull $Version
    }

Register-JDTest `
    -Name "Operating System Detected" `
    -Category "Runtime" `
    -Description "Operating system is reported." `
    -Tags @("Runtime","OS","WP-003F.2") `
    -ScriptBlock {

        $Runtime = Test-JDRuntime

        $OS = $Runtime |
            Where-Object Name -eq "Operating System"

        Assert-JDNotNull $OS
    }

#------------------------------------------------------------------------------
# Repository Validation
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Repository Root Exists" `
    -Category "Repository" `
    -Description "Repository root can be resolved." `
    -Tags @("Repository","WP-003F.2") `
    -ScriptBlock {

        $Root = Get-JDRepositoryRoot

        Assert-JDNotNull $Root

        Assert-JDTrue `
            -Condition (Test-Path -LiteralPath $Root -PathType Container) `
            -Message "Repository root directory does not exist."
    }

Register-JDTest `
    -Name "Repository Validation Executes" `
    -Category "Repository" `
    -Description "Repository validation completes successfully." `
    -Tags @("Repository","Validation","WP-003F.2") `
    -ScriptBlock {

        $Repository = Test-JDRepository

        Assert-JDNotNull $Repository

        Assert-JDNotEmpty $Repository
    }

#------------------------------------------------------------------------------
# Environment Report
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Environment Report Generated" `
    -Category "Reporting" `
    -Description "Environment report is generated successfully." `
    -Tags @("Reporting","WP-003F.2") `
    -ScriptBlock {

        $Report = Get-JDEnvironmentReport

        Assert-JDNotNull $Report

        Assert-JDHasProperty `
            -Object $Report `
            -Property "Title"

        Assert-JDHasProperty `
            -Object $Report `
            -Property "Results"
    }

Register-JDTest `
    -Name "Environment Report Protected" `
    -Category "Reporting" `
    -Description "Protected report contains no exposed secrets." `
    -Tags @("Reporting","Secrets","WP-003F.2") `
    -ScriptBlock {

        $Report = Get-JDEnvironmentReport

        $Json = $Report |
            ConvertTo-Json -Depth 25

        foreach($Name in @(
            'NEXT_PUBLIC_SUPABASE_ANON_KEY',
            'SUPABASE_SERVICE_ROLE_KEY',
            'JWT_SECRET',
            'NEXTAUTH_SECRET'
        ))
        {
            $Value = [Environment]::GetEnvironmentVariable(
                $Name
            )

            if([string]::IsNullOrWhiteSpace($Value))
            {
                continue
            }

            Assert-JDFalse (
                $Json.Contains($Value)
            ) `
            -Message (
                "Secret value for '{0}' was exposed." -f
                $Name
            )
        }
    }

#------------------------------------------------------------------------------
# WP-003F.2 Contract Acceptance
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Missing Mandatory Configuration Detected" `
    -Category "Configuration" `
    -Description "Missing mandatory configuration values produce failures." `
    -Tags @("Configuration","Acceptance","WP-003F.2") `
    -ScriptBlock {

        Set-WP003F2Environment -Values @{}

        $Results = Test-JDSecurityEnvironment

        Assert-JDContains `
            -Value (($Results | Where-Object Result -eq "FAIL").Name -join ",") `
            -Substring "Supabase URL"
    }

Register-JDTest `
    -Name "Malformed URLs Detected" `
    -Category "Configuration" `
    -Description "Malformed Supabase and API URLs are rejected." `
    -Tags @("Configuration","URL","Acceptance","WP-003F.2") `
    -ScriptBlock {

        $Values = New-WP003F2ValidEnvironment
        $Values.NEXT_PUBLIC_SUPABASE_URL = "not-a-url"
        $Values.API_BASE_URL = "also-not-a-url"

        Set-WP003F2Environment -Values $Values

        $Results = Test-JDSecurityEnvironment

        Assert-JDContains `
            -Value (($Results | Where-Object Result -eq "FAIL").Name -join ",") `
            -Substring "Supabase URL"

        Assert-JDContains `
            -Value (($Results | Where-Object Result -eq "FAIL").Name -join ",") `
            -Substring "API Base URL"
    }

Register-JDTest `
    -Name "Empty Mandatory Secrets Detected" `
    -Category "Configuration" `
    -Description "Empty mandatory secrets produce failures." `
    -Tags @("Configuration","Secrets","Acceptance","WP-003F.2") `
    -ScriptBlock {

        $Values = New-WP003F2ValidEnvironment
        $Values.NEXT_PUBLIC_SUPABASE_ANON_KEY = ""
        $Values.SUPABASE_SERVICE_ROLE_KEY = ""

        Set-WP003F2Environment -Values $Values

        $Results = Test-JDSecurityEnvironment

        Assert-JDContains `
            -Value (($Results | Where-Object Result -eq "FAIL").Name -join ",") `
            -Substring "Supabase Anonymous Key"

        Assert-JDContains `
            -Value (($Results | Where-Object Result -eq "FAIL").Name -join ",") `
            -Substring "Service Role Key"
    }

Register-JDTest `
    -Name "Duplicate Configuration Identified" `
    -Category "Configuration" `
    -Description "Duplicate configuration values are reported deterministically." `
    -Tags @("Configuration","Duplicate","Acceptance","WP-003F.2") `
    -ScriptBlock {

        $Values = New-WP003F2ValidEnvironment
        $Values.SUPABASE_URL = $Values.NEXT_PUBLIC_SUPABASE_URL

        Set-WP003F2Environment -Values $Values

        $Results = Test-JDSecurityEnvironment

        $SupabaseStatus = $Results |
            Where-Object Name -eq "Supabase URL"

        Assert-JDPropertyEquals `
            -Object $SupabaseStatus `
            -Property "Result" `
            -Expected "WARNING"
    }

Register-JDTest `
    -Name "Conflicting Configuration Detected" `
    -Category "Configuration" `
    -Description "Conflicting duplicate configuration is rejected." `
    -Tags @("Configuration","Conflict","Acceptance","WP-003F.2") `
    -ScriptBlock {

        $Values = New-WP003F2ValidEnvironment
        $Values.SUPABASE_URL = "https://conflict.example.test"

        Set-WP003F2Environment -Values $Values

        $Results = Test-JDSecurityEnvironment

        $SupabaseStatus = $Results |
            Where-Object Name -eq "Supabase URL"

        Assert-JDPropertyEquals `
            -Object $SupabaseStatus `
            -Property "Result" `
            -Expected "FAIL"
    }

Register-JDTest `
    -Name "Configuration Summary Generated" `
    -Category "Reporting" `
    -Description "Configuration summary is included in the environment report." `
    -Tags @("Reporting","Configuration","WP-003F.2") `
    -ScriptBlock {

        $Values = New-WP003F2ValidEnvironment

        Set-WP003F2Environment -Values $Values

        $Summary = Get-JDEnvironmentConfigurationSummary

        Assert-JDNotNull $Summary
        Assert-JDNotEmpty $Summary

        $Supabase = $Summary |
            Where-Object Name -eq "Supabase URL"

        Assert-JDNotNull $Supabase
    }

#------------------------------------------------------------------------------
# Module Diagnostics
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Module State Available" `
    -Category "Diagnostics" `
    -Description "Module state is returned." `
    -Tags @("Diagnostics","WP-003F.2") `
    -ScriptBlock {

        $State = Get-JDEnvironmentModuleState

        Assert-JDNotNull $State

        Assert-JDHasProperty `
            -Object $State `
            -Property "Version"

        Assert-JDHasProperty `
            -Object $State `
            -Property "Environment"
    }

Register-JDTest `
    -Name "Module Integrity Passes" `
    -Category "Diagnostics" `
    -Description "Environment module integrity validation succeeds." `
    -Tags @("Diagnostics","Integrity","WP-003F.2") `
    -ScriptBlock {

        $Integrity = Test-JDEnvironmentModule

        Assert-JDNotNull $Integrity

        Assert-JDPropertyEquals `
            -Object $Integrity `
            -Property "Success" `
            -Expected $true
    }

#------------------------------------------------------------------------------
# Startup Validation Integration
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Startup Validation Blocks Invalid Configuration" `
    -Category "Integration" `
    -Description "Platform initialisation validates environment before starting the Operational Host." `
    -Tags @("Integration","Startup","WP-003F.2") `
    -ScriptBlock {

        $Values = New-WP003F2ValidEnvironment
        $Values.NEXT_PUBLIC_SUPABASE_URL = "invalid-url"

        Set-WP003F2Environment -Values $Values

        function Get-JDOperationalHostStatus {
            return $null
        }

        function Start-JDOperationalHost {
            throw "Operational Host must not start during invalid configuration validation."
        }

        $InitializePath = Join-Path `
            $RepositoryRoot `
            "tooling\engineering\Services\Public\Initialize-JDPlatform.ps1"

        . $InitializePath

        $Blocked = $false

        try
        {
            Initialize-JDPlatform
        }
        catch
        {
            $Blocked = $true
        }

        Assert-JDTrue $Blocked
    }

#------------------------------------------------------------------------------
# Integration
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Full Environment Pipeline" `
    -Category "Integration" `
    -Description "End-to-end environment validation pipeline executes." `
    -Tags @("Integration","WP-003F.2") `
    -ScriptBlock {

        $Statuses = Test-JDSecurityEnvironment

        $Report = Get-JDEnvironmentReport

        Assert-JDNotNull $Statuses

        Assert-JDNotNull $Report

        Assert-JDHasProperty `
            -Object $Report `
            -Property "Results"
    }

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Report Redaction Validation
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Sensitive Values Are Redacted" `
    -Category "Reporting" `
    -Description "Protected reports do not expose secret values." `
    -Tags @("Reporting","Redaction","WP-003F.2") `
    -ScriptBlock {

        $Report = Get-JDEnvironmentReport

        $Json = $Report |
            ConvertTo-Json -Depth 25

        foreach($Name in @(
            'NEXT_PUBLIC_SUPABASE_ANON_KEY',
            'SUPABASE_SERVICE_ROLE_KEY',
            'JWT_SECRET',
            'NEXTAUTH_SECRET'
        ))
        {
            $Value = [Environment]::GetEnvironmentVariable(
                $Name
            )

            if([string]::IsNullOrWhiteSpace($Value))
            {
                continue
            }

            Assert-JDFalse (
                $Json.Contains($Value)
            ) `
            -Message (
                "Secret value for '{0}' was exposed." -f
                $Name
            )
        }
    }

#------------------------------------------------------------------------------
# Execute Test Suite
#------------------------------------------------------------------------------

$Report = Invoke-JDTests
#------------------------------------------------------------------------------
# Environment Cleanup
#------------------------------------------------------------------------------

Restore-WP003F2Environment


#------------------------------------------------------------------------------
# Framework Validation
#------------------------------------------------------------------------------

Assert-JDNotNull $Report

Assert-JDPropertyEquals `
    -Object $Report `
    -Property "Success" `
    -Expected $true

#------------------------------------------------------------------------------
# Summary
#------------------------------------------------------------------------------

$Summary = Get-JDTestSummary

Assert-JDNotNull $Summary

#------------------------------------------------------------------------------
# Return Report
#------------------------------------------------------------------------------

return $Report