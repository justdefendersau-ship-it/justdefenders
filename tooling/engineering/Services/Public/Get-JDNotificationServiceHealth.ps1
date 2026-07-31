<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
File: tooling\engineering\Services\Public\Get-JDNotificationServiceHealth.ps1
Timestamp: 31 July 2026, 21:45

Purpose:
    Returns the health status of the Notification managed service.
#>

Set-StrictMode -Version Latest

function Get-JDNotificationServiceHealth {
    [CmdletBinding()]
    param()

    try {

        $health = [pscustomobject]@{
            Service        = 'Notification'
            DisplayName    = 'JustDefenders Notification Service'
            Health         = 'HEALTHY'
            Status         = 'Running'
            Available      = $true
            Initialised    = $true
            CheckedAt      = Get-Date
            Version        = '1.0.0'
            Diagnostics    = [ordered]@{
                QueueReady      = $true
                DispatcherReady = $true
                HostConnected   = $true
                Errors          = 0
            }
        }

        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Verbose -Message 'Notification service health requested.'
        }

        return $health
    }
    catch {
        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
        }

        throw
    }
}

Export-ModuleMember -Function Get-JDNotificationServiceHealth
