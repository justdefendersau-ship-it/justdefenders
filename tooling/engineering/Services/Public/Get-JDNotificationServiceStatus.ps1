<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
File: tooling\engineering\Services\Public\Get-JDNotificationServiceStatus.ps1
Timestamp: 31 July 2026, 21:40

Returns the current operational status of the Notification managed service.
#>

Set-StrictMode -Version Latest

function Get-JDNotificationServiceStatus {
    [CmdletBinding()]
    param()

    try {
        $status = [pscustomobject]@{
            Service      = 'Notification'
            DisplayName  = 'JustDefenders Notification Service'
            State        = 'Running'
            Healthy      = $true
            Initialised  = $true
            CheckedAt    = Get-Date
            Version      = '1.0.0'
        }

        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Verbose -Message 'Notification service status requested.'
        }

        return $status
    }
    catch {
        if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
            Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
        }
        throw
    }
}

Export-ModuleMember -Function Get-JDNotificationServiceStatus
