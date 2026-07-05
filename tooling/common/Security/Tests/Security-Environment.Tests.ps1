<#
===============================================================================
JustDefenders© Engineering
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

• Security-Foundation.psm1
• Security-Environment.psm1
• Test-Framework.psm1
• Test-Assertions.psm1

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Repository Resolution
#------------------------------------------------------------------------------

$RepositoryRoot = Split-Path (
    Split-Path (
        Split-Path $PSScriptRoot -Parent
    ) -Parent
) -Parent

$SecurityRoot = Join-Path `
    $RepositoryRoot `
    "tooling\common\Security"

$TestingRoot = Join-Path `
    $RepositoryRoot `
    "tooling\common\Testing"

#------------------------------------------------------------------------------
# Import Modules
#------------------------------------------------------------------------------

Import-Module (
    Join-Path $SecurityRoot "Security-Foundation.psm1"
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
# Reset Framework
#------------------------------------------------------------------------------

Reset-JDTestFramework

#------------------------------------------------------------------------------
# Module Import
#------------------------------------------------------------------------------

Register-JDTest `
    -Name "Security Foundation Imports" `
    -Category "Import" `
    -Description "Security Foundation module imports successfully." `
    -Tags @("Import","Foundation","WP-003F.2") `
    -ScriptBlock {

        Assert-JDNotNull (
            Get-Command `
                Get-JDSecurityFoundationVersion `
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
            Assert-JDHasProperty `
                -Object $Status `
                -Property "PSTypeName"

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

        Assert-JDDirectoryExists $Root
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

        Assert-JDFalse (
            $Json.Contains("SUPABASE_SERVICE_ROLE_KEY")
        )

        Assert-JDFalse (
            $Json.Contains("JWT_SECRET")
        )
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

        foreach($Definition in $Script:RequiredVariables)
        {
            if(-not $Definition.Secret)
            {
                continue
            }

            $Value = [Environment]::GetEnvironmentVariable(
                $Definition.Name
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
                $Definition.Name
            )
        }
    }

#------------------------------------------------------------------------------
# Execute Test Suite
#------------------------------------------------------------------------------

$Report = Invoke-JDTests

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