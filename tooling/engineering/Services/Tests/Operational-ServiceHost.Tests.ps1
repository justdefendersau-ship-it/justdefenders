<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Tests\Operational-ServiceHost.Tests.ps1

Timestamp
10 July 2026 11:50

Work Package
WP-S001-03

Purpose
Engineering validation suite for the Operational Service Host.

This suite validates:

    • Registry integration
    • Host lifecycle
    • Scheduler lifecycle
    • Service lifecycle
    • Health monitoring
    • Recovery subsystem

==============================================================================#
#>

Import-Module `
    "$PSScriptRoot\..\Operational-ServiceHost.psm1" `
    -Force

Describe "Operational Service Host" {

    BeforeAll {

        Initialize-JDOperationalRegistry | Out-Null

        Register-JDOperationalService `
            -Registration ([pscustomobject]@{

                Name = "Heartbeat"

            }) | Out-Null
    }

    Context "Host Lifecycle" {

        It "Starts the Host" {

            $host = Start-JDOperationalHost

            $host.Running | Should -BeTrue
        }

        It "Reports Host Status" {

            $status = Get-JDOperationalHostStatus

            $status.Running | Should -BeTrue

            $status.Initialised | Should -BeTrue
        }
    }

    Context "Service Lifecycle" {

        It "Starts Service" {

            $svc = Start-JDOperationalService `
                -Name "Heartbeat"

            $svc.State | Should -Be "RUNNING"
        }

        It "Reports Service Health" {

            $health = Get-JDOperationalServiceHealth `
                -Name "Heartbeat"

            $health.Health | Should -Not -BeNullOrEmpty
        }

        It "Restarts Service" {

            $svc = Restart-JDOperationalService `
                -Name "Heartbeat"

            $svc.RestartSuccessful | Should -BeTrue
        }

        It "Stops Service" {

            $svc = Stop-JDOperationalService `
                -Name "Heartbeat"

            $svc.Stopped | Should -BeTrue
        }
    }

    Context "Scheduler" {

        It "Starts Scheduler" {

            Start-JDHostScheduler

            (Get-JDHostSchedulerStatus).Running |
                Should -BeTrue
        }

        It "Stops Scheduler" {

            Stop-JDHostScheduler

            (Get-JDHostSchedulerStatus).Running |
                Should -BeFalse
        }
    }

    Context "Recovery" {

        It "Returns Recovery Status" {

            $status = Get-JDHostRecoveryStatus

            $status |
                Should -Not -BeNullOrEmpty
        }

    }

    Context "Health" {

        It "Returns Host Statistics" {

            $stats = Get-JDHostStatistics

            $stats |
                Should -Not -BeNullOrEmpty
        }

    }

    AfterAll {

        Stop-JDOperationalHost | Out-Null

        Clear-JDOperationalRegistry | Out-Null
    }

}