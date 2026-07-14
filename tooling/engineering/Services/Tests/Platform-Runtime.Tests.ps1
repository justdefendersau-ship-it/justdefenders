<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-008
Component          : Platform Validation Tests
Timestamp          : 15 July 2026 11:00
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Tests\Platform-Runtime.Tests.ps1

Purpose:
    Pester validation for the Platform Runtime foundation.
==============================================================================
#>

Describe 'Platform Runtime' {

    BeforeAll {
        $modulePath = Join-Path $PSScriptRoot '..\Platform-Runtime.psm1'
        Import-Module $modulePath -Force
    }

    It 'Imports successfully' {
        (Get-Module Platform-Runtime) | Should -Not -BeNullOrEmpty
    }

    It 'Exports Start-JDPlatform' {
        Get-Command Start-JDPlatform | Should -Not -BeNullOrEmpty
    }

    It 'Exports Stop-JDPlatform' {
        Get-Command Stop-JDPlatform | Should -Not -BeNullOrEmpty
    }

    It 'Exports Restart-JDPlatform' {
        Get-Command Restart-JDPlatform | Should -Not -BeNullOrEmpty
    }

    It 'Exports Get-JDPlatformStatus' {
        Get-Command Get-JDPlatformStatus | Should -Not -BeNullOrEmpty
    }

    It 'Initialises platform bootstrap' {
        Initialize-JDPlatform | Should -Not -BeNullOrEmpty
    }

    It 'Returns platform status' {
        Get-JDPlatformStatus | Should -Not -BeNullOrEmpty
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-008
#==============================================================================
