@{

<#
==============================================================================
JustDefenders Â©
==============================================================================
Work Package       : WP-S001-04
Production Revision: PR-007A
Component          : Operational Service Bootstrap Manifest
Timestamp          : 22 July 2026, 10:05
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Configuration\BuiltInServices.psd1

------------------------------------------------------------------------------
DESCRIPTION
------------------------------------------------------------------------------

This manifest is the authoritative configuration source for all built-in
Operational Host services.

The bootstrap engine consumes this file to construct the runtime registry.

This file deliberately contains configuration only.

No executable logic belongs here.

------------------------------------------------------------------------------
DESIGN PRINCIPLES
------------------------------------------------------------------------------

â€¢ Single Source of Truth
â€¢ Manifest Driven Bootstrap
â€¢ No Hard-Coded Services
â€¢ Production Safe
â€¢ Future Plugin Compatible
â€¢ PowerShell Data File (.psd1)

==============================================================================
#>

    ManifestVersion = '1.0.0'


    Services = @(

        @{
            Name           = 'Harvester'

Version = '1.0.0'

            DisplayName    = 'Forum Harvester'

            Description    = 'Collects intelligence from supported community sources.'

Enabled        = $true
AutoStart      = $true

            StartupOrder   = 100

            HealthPolicy   = 'Critical'

            RestartPolicy  = 'Automatic'

            MaxRestartCount = 5

            RestartDelaySeconds = 30

            Dependencies   = @()

            RegistrationCommand = 'Register-JDHarvesterService'

            StartupCommand = 'Start-JDHarvester'

            ExecuteCommand = 'Invoke-JDManagedServiceExecute'

            StopCommand    = 'Stop-JDHarvester'

            HealthCommand  = 'Get-JDHarvesterHealth'
            RestartCommand = 'Restart-JDHarvester'
            StatusCommand  = 'Get-JDHarvesterStatus'
            MetricsCommand = 'Get-JDHarvesterMetrics'
        },

        @{
            Name           = 'Notifications'

            DisplayName    = 'Notification Runtime'

            Description    = 'Processes operational notifications.'

            Enabled        = $true

            AutoStart      = $true

            StartupOrder   = 200

            HealthPolicy   = 'Normal'

            RestartPolicy  = 'Automatic'

            MaxRestartCount = 5

            RestartDelaySeconds = 30

            Dependencies   = @()

            RegistrationCommand = 'Register-JDNotificationService'

            StartupCommand = 'Start-JDNotificationService'

            ExecuteCommand = 'Invoke-JDManagedServiceExecute'

            StopCommand    = 'Stop-JDNotificationService'

            HealthCommand  = 'Get-JDNotificationHealth'
        },

        @{
            Name           = 'Garage'

            DisplayName    = 'Garage Workflow Engine'

            Description    = 'Provides garage workflow processing.'

            Enabled   = $false
AutoStart = $false

            StartupOrder   = 300

            HealthPolicy   = 'Critical'

            RestartPolicy  = 'Automatic'

            MaxRestartCount = 5

            RestartDelaySeconds = 30

            Dependencies   = @()

            RegistrationCommand = 'Register-JDGarageService'

            StartupCommand = 'Start-JDGarageService'

            ExecuteCommand = 'Invoke-JDManagedServiceExecute'

            StopCommand    = 'Stop-JDGarageService'

            HealthCommand  = 'Get-JDGarageHealth'
        },

        @{
            Name           = 'Fuel'

            DisplayName    = 'Fuel Intelligence'

            Description    = 'Processes fuel intelligence workflows.'

            Enabled        = $true

            AutoStart      = $true

            StartupOrder   = 400

            HealthPolicy   = 'Normal'

            RestartPolicy  = 'Automatic'

            MaxRestartCount = 5

            RestartDelaySeconds = 30

            Dependencies   = @()

            RegistrationCommand = 'Register-JDFuelService'

            StartupCommand = 'Start-JDFuelService'

            ExecuteCommand = 'Invoke-JDManagedServiceExecute'

            StopCommand    = 'Stop-JDFuelService'

            HealthCommand  = 'Get-JDFuelHealth'
        },
        @{
            Name                  = 'Mobile'

            DisplayName           = 'Mobile Platform'

            Description           = 'Provides mobile platform integration services.'

            Enabled               = $true

            AutoStart             = $true

            StartupOrder          = 500

            HealthPolicy          = 'Normal'

            RestartPolicy         = 'Automatic'

            MaxRestartCount       = 5

            RestartDelaySeconds   = 30

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDMobileService'

            StartupCommand        = 'Start-JDMobileService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDMobileService'

            HealthCommand         = 'Get-JDMobileHealth'
        },

        @{
            Name                  = 'Timeline'

            DisplayName           = 'Timeline Workflow Engine'

            Description           = 'Processes operational timeline workflows.'

            Enabled               = $true

            AutoStart             = $true

            StartupOrder          = 600

            HealthPolicy          = 'Normal'

            RestartPolicy         = 'Automatic'

            MaxRestartCount       = 5

            RestartDelaySeconds   = 30

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDTimelineService'

            StartupCommand        = 'Start-JDTimelineService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDTimelineService'

            HealthCommand         = 'Get-JDTimelineHealth'
        },

        @{
            Name                  = 'RealtimeDetection'

            DisplayName           = 'Realtime Detection Runtime'

            Description           = 'Future realtime detection engine.'

            Enabled               = $false

            AutoStart             = $false

            StartupOrder          = 700

            HealthPolicy          = 'Critical'

            RestartPolicy         = 'Manual'

            MaxRestartCount       = 0

            RestartDelaySeconds   = 0

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDRealtimeDetectionService'

            StartupCommand        = 'Start-JDRealtimeDetectionService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDRealtimeDetectionService'

            HealthCommand         = 'Get-JDRealtimeDetectionHealth'
        },

        @{
            Name                  = 'Telemetry'

            DisplayName           = 'Telemetry Ingestion'

            Description           = 'Future telemetry ingestion runtime.'

            Enabled               = $false

            AutoStart             = $false

            StartupOrder          = 800

            HealthPolicy          = 'Critical'

            RestartPolicy         = 'Manual'

            MaxRestartCount       = 0

            RestartDelaySeconds   = 0

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDTelemetryService'

            StartupCommand        = 'Start-JDTelemetryService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDTelemetryService'

            HealthCommand         = 'Get-JDTelemetryHealth'
        },

        @{
            Name                  = 'SOC'

            DisplayName           = 'Security Operations Runtime'

            Description           = 'Future Security Operations Centre runtime.'

            Enabled               = $false

            AutoStart             = $false

            StartupOrder          = 900

            HealthPolicy          = 'Critical'

            RestartPolicy         = 'Manual'

            MaxRestartCount       = 0

            RestartDelaySeconds   = 0

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDSOCService'

            StartupCommand        = 'Start-JDSOCService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDSOCService'

            HealthCommand         = 'Get-JDSOCHealth'
        },

        @{
            Name                  = 'AdvancedDetection'

            DisplayName           = 'Advanced Detection Engine'

            Description           = 'Future behavioural detection engine.'

            Enabled               = $false

            AutoStart             = $false

            StartupOrder          = 1000

            HealthPolicy          = 'Critical'

            RestartPolicy         = 'Manual'

            MaxRestartCount       = 0

            RestartDelaySeconds   = 0

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDAdvancedDetectionService'

            StartupCommand        = 'Start-JDAdvancedDetectionService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDAdvancedDetectionService'

            HealthCommand         = 'Get-JDAdvancedDetectionHealth'
        },

        @{
            Name                  = 'WindowsCollector'

            DisplayName           = 'Windows Collector'

            Description           = 'Future Windows endpoint collector.'

            Enabled               = $false

            AutoStart             = $false

            StartupOrder          = 1100

            HealthPolicy          = 'Critical'

            RestartPolicy         = 'Manual'

            MaxRestartCount       = 0

            RestartDelaySeconds   = 0

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDWindowsCollectorService'

            StartupCommand        = 'Start-JDWindowsCollectorService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDWindowsCollectorService'

            HealthCommand         = 'Get-JDWindowsCollectorHealth'
        },

        @{
            Name                  = 'SocketDetection'

            DisplayName           = 'Socket Detection Runtime'

            Description           = 'Future socket monitoring runtime.'

            Enabled               = $false

            AutoStart             = $false

            StartupOrder          = 1200

            HealthPolicy          = 'Critical'

            RestartPolicy         = 'Manual'

            MaxRestartCount       = 0

            RestartDelaySeconds   = 0

            Dependencies          = @()

            RegistrationCommand   = 'Register-JDSocketDetectionService'

            StartupCommand        = 'Start-JDSocketDetectionService'

            ExecuteCommand        = 'Invoke-JDManagedServiceExecute'

            StopCommand           = 'Stop-JDSocketDetectionService'

            HealthCommand         = 'Get-JDSocketDetectionHealth'
        }
    )
}