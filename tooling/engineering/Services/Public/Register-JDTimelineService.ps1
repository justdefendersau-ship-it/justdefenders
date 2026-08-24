<#
==============================================================================
JustDefenders ©
File:
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Register-JDTimelineService.ps1

Timestamp:
13 August 2026 21:03 (Sydney)

Work Package:
WP-HARVEST-001 / PR-001

Purpose:
Registers the Timeline managed service using the existing Operational Host
registration contract and the established Timeline service manifest contract.
==============================================================================
#>

Set-StrictMode -Version Latest

function Register-JDTimelineService {
    [CmdletBinding()]
    param(
        [switch]$Force
    )

    $service = [ordered]@{
        Name               = 'Timeline'
        DisplayName        = 'Timeline Workflow Engine'
        Description        = 'Processes operational timeline workflows.'
        Enabled            = $true
        AutoStart          = $true
        StartupOrder       = 600
        HealthPolicy       = 'Normal'
        RestartPolicy      = 'Automatic'
        MaxRestartCount    = 5
        RestartDelaySeconds = 30
        Dependencies       = @()

        RegistrationCommand = 'Register-JDTimelineService'
        StartCommand        = 'Start-JDTimelineService'
        StartupCommand      = 'Start-JDTimelineService'
        StopCommand         = 'Stop-JDTimelineService'
        StatusCommand       = 'Get-JDTimelineHealth'
        HealthCommand       = 'Get-JDTimelineHealth'
        RestartCommand      = 'Restart-JDHostService'
    }

    if (-not (Get-Command Register-JDOperationalHostService -ErrorAction SilentlyContinue)) {
        throw 'Register-JDOperationalHostService is not available.'
    }

    $result = Register-JDOperationalHostService -Registration ([pscustomobject]$service)

    if (Get-Command Engineering-Common\Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
        Engineering-Common\Write-JDEngineeringLog `
            -Level Information `
            -Message 'Timeline service registered.'
    }

    return [pscustomobject]@{
        Success    = $true
        Service    = $service.Name
        Registered = $true
        Result     = $result
    }
}

Export-ModuleMember -Function Register-JDTimelineService
