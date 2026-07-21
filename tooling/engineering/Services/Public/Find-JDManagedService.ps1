#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Find-JDManagedService.ps1
# Work Package: PR-005A.2 – Managed Service Discovery
# Timestamp: 20 July 2026, 09:15
# =====================================================

function Find-JDManagedService {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Name)

    if (-not (Get-Command Get-JDOperationalHostService -ErrorAction SilentlyContinue)) {
        throw "Operational Host lookup API 'Get-JDOperationalHostService' is unavailable."
    }

    $service = Get-JDOperationalHostService -Name $Name
    if ($null -eq $service) { return $null }

    [PSCustomObject]@{
        Name=$service.Name
        DisplayName=$service.DisplayName
        Description=$service.Description
        Version=$service.Version
        RuntimeType=$service.RuntimeType
        RuntimeStatus=if($service.PSObject.Properties.Match('RuntimeStatus').Count){$service.RuntimeStatus}else{$null}
        Source='Operational-ServiceHost'
        Registration=$service
    }
}
