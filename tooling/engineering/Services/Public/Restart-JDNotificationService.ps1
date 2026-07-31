<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
File: tooling\engineering\Services\Public\Restart-JDNotificationService.ps1
Timestamp: 31 July 2026, 21:35

Purpose:
    Restarts the Notification managed service using the standard
    managed-service lifecycle implemented by the Operational Host.
#>

Set-StrictMode -Version Latest

function Restart-JDNotificationService {
    [CmdletBinding(SupportsShouldProcess = $true)]
    param()

    try {
        if ($PSCmdlet.ShouldProcess('Notification','Restart')) {

            if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
                Write-JDEngineeringLog -Level Information -Message 'Restarting Notification service.'
            }

            if (-not (Get-Command Stop-JDNotificationService -ErrorAction SilentlyContinue)) {
                throw 'Stop-JDNotificationService is not available.'
            }

            if (-not (Get-Command Start-JDNotificationService -ErrorAction SilentlyContinue)) {
                throw 'Start-JDNotificationService is not available.'
            }

            $null = Stop-JDNotificationService
            $state = Start-JDNotificationService

            [pscustomobject]@{
                Success     = $true
                Service     = 'Notification'
                Action      = 'Restart'
                RestartedAt = Get-Date
                State       = $state
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

Export-ModuleMember -Function Restart-JDNotificationService
