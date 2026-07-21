#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService-Discovery.ps1
# Work Package: PR-005A.2 – Managed Service Discovery
# Timestamp: 20 July 2026, 09:15
# =====================================================

function Get-JDManagedServiceDiscovery {
    [CmdletBinding()]
    param([string]$Name,[switch]$IncludeDisabled)

    if (-not (Get-Command Get-JDOperationalHostServices -ErrorAction SilentlyContinue)) {
        throw "Operational Host discovery API 'Get-JDOperationalHostServices' is unavailable."
    }

    $services = @(Get-JDOperationalHostServices)

    if ($Name) {
        $services = $services | Where-Object { $_.Name -like $Name -or $_.DisplayName -like $Name }
    }

    if (-not $IncludeDisabled) {
        $services = $services | Where-Object {
            if ($_.PSObject.Properties.Match('Enabled').Count) { $_.Enabled -ne $false } else { $true }
        }
    }

    foreach($service in $services){
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
}
