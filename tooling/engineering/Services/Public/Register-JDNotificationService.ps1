<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
File: tooling\engineering\Services\Public\Register-JDNotificationService.ps1
Timestamp: 31 July 2026, 21:16

Purpose:
    Registers the Notification managed service with the Operational Host.
    This implementation follows the recovered managed-service architecture
    and delegates host registration to Register-JDOperationalHostService.
#>

Set-StrictMode -Version Latest

function Register-JDNotificationService {
    [CmdletBinding()]
    param(
        [switch]$Force
    )

    $service = [ordered]@{
        Name               = 'Notification'
        DisplayName        = 'JustDefenders Notification Service'
        Description        = 'Managed notification runtime'
        Enabled            = $true

        StartCommand       = 'Start-JDNotificationService'
        StartupCommand     = 'Start-JDNotificationService'
        StopCommand        = 'Stop-JDNotificationService'
        RestartCommand     = 'Restart-JDNotificationService'

        StatusCommand      = 'Get-JDNotificationServiceStatus'
        HealthCommand      = 'Get-JDNotificationServiceHealth'

        Version            = '1.0.0'
        Tags               = @('ManagedService','Notification')
    }

    try {
        if (-not (Get-Command Register-JDOperationalHostService -ErrorAction SilentlyContinue)) {
            throw "Register-JDOperationalHostService is not available."
        }

        $result = Register-JDOperationalHostService -Service $service -Force:$Force

        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Information -Message "Notification service registered."
        }

        return [pscustomobject]@{
            Success   = $true
            Service   = $service.Name
            Registered= $true
            Result    = $result
        }
    }
    catch {
        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
        }

        throw
    }
}

Export-ModuleMember -Function Register-JDNotificationService
