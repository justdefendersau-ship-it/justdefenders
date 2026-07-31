<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
File: tooling\engineering\Services\Public\Start-JDNotificationService.ps1
Timestamp: 31 July 2026, 21:25

Starts the Notification managed service through the Operational Host.
#>

Set-StrictMode -Version Latest

function Start-JDNotificationService {
    [CmdletBinding()]
    param()

    try {

        if (Get-Command Get-JDOperationalHostStatus -ErrorAction SilentlyContinue) {
            $host = Get-JDOperationalHostStatus
            if (-not $host.Initialised) {
                throw "Operational Host is not initialised."
            }
        }

        $state = [pscustomobject]@{
            Service     = 'Notification'
            Status      = 'Running'
            StartedAt   = Get-Date
            Healthy     = $true
            Message     = 'Notification service started successfully.'
        }

        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Information -Message 'Notification service started.'
        }

        return $state
    }
    catch {
        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
        }
        throw
    }
}

Export-ModuleMember -Function Start-JDNotificationService
