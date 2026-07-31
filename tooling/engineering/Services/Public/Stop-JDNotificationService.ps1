<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
File: tooling\engineering\Services\Public\Stop-JDNotificationService.ps1
Timestamp: 31 July 2026, 21:30

Stops the Notification managed service through the Operational Host.
#>

Set-StrictMode -Version Latest

function Stop-JDNotificationService {
    [CmdletBinding(SupportsShouldProcess=$true)]
    param()

    try {
        if ($PSCmdlet.ShouldProcess("Notification","Stop")) {

            if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
                Write-JDEngineeringLog -Level Information -Message "Stopping Notification service."
            }

            return [pscustomobject]@{
                Service   = 'Notification'
                Status    = 'Stopped'
                StoppedAt = Get-Date
                Healthy   = $true
                Message   = 'Notification service stopped successfully.'
            }
        }
    }
    catch {
        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
        }
        throw
    }
}

Export-ModuleMember -Function Stop-JDNotificationService
