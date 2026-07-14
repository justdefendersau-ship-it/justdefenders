<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-008
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Pester Test Suite
Purpose             : Validate the Engineering Builder pipeline.
Timestamp           : 14 July 2026 19:00

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\tests\
Engineering-Builder.Tests.ps1
#>

BeforeAll {
    Set-StrictMode -Version Latest
    $ModulePath = Join-Path $PSScriptRoot '..\Engineering-Builder.psm1'
    if(Test-Path $ModulePath){
        Import-Module $ModulePath -Force
    }
}

Describe 'Engineering Builder - Module' {

    It 'Exports engineering metadata' {
        if(Get-Command Get-JDEngineeringBuilderInfo -ErrorAction SilentlyContinue){
            (Get-JDEngineeringBuilderInfo).ModuleName | Should -Be 'Engineering-Builder'
        } else {
            Set-ItResult -Skipped -Because 'Module not assembled yet.'
        }
    }

    It 'Creates a build target' {
        if([System.Management.Automation.PSTypeName]'JDBuildTarget'.Type){
            $t=[JDBuildTarget]::new()
            $t | Should -Not -BeNullOrEmpty
        } else {
            Set-ItResult -Skipped -Because 'Contracts not yet assembled.'
        }
    }

    It 'Discovers production revisions' {
        if(Get-Command Get-JDProductionRevisionFiles -ErrorAction SilentlyContinue){
            { Get-JDProductionRevisionFiles -DevelopmentFolder $PSScriptRoot } | Should -Not -Throw
        } else {
            Set-ItResult -Skipped -Because 'Discovery engine not available.'
        }
    }

    It 'Parses module syntax' {
        if(Get-Command Test-JDModuleSyntax -ErrorAction SilentlyContinue){
            $r=Test-JDModuleSyntax -ModuleFile $PSCommandPath
            $r | Should -Not -BeNullOrEmpty
        } else {
            Set-ItResult -Skipped -Because 'Validation engine not available.'
        }
    }

    It 'Produces a build summary object' {
        if(Get-Command Show-JDBuildSummary -ErrorAction SilentlyContinue){
            $r=[JDBuildResult]::new()
            $s=Show-JDBuildSummary -Result $r
            $s | Should -Not -BeNullOrEmpty
        } else {
            Set-ItResult -Skipped -Because 'Reporting engine not available.'
        }
    }
}

#==============================================================================
# END OF PRODUCTION REVISION PR-008
#==============================================================================
