<#
==============================================================================
 JustDefenders ©
 File:
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-ServiceHost.psm1

 Timestamp:
 09 July 2026 15:45

 Work Package:
 WP-S001-03 – Operational Service Host

 Version:
 0.2.0 (Service Supervision Foundation)
==============================================================================#>

Set-StrictMode -Version Latest

Import-Module "$PSScriptRoot\..\Common\Engineering-Common.psm1" -Force -ErrorAction Stop
Import-Module "$PSScriptRoot\Operational-Registry.psm1" -Force -ErrorAction Stop

$Script:HostState = [ordered]@{
    Name      = "JustDefenders Operational Service Host"
    Version   = "0.2.0"
    Running   = $false
    StartedAt = $null
    StoppedAt = $null
}

function Start-JDOperationalHost {
    [CmdletBinding()]
    param()

    if(-not $Script:HostState.Running){
        Initialize-JDOperationalRegistry | Out-Null
        $Script:HostState.Running=$true
        $Script:HostState.StartedAt=Get-Date
        Write-JDEngineeringLog -Level Information -Message "Operational Service Host started."
    }

    Get-JDOperationalHostStatus
}

function Stop-JDOperationalHost {
    [CmdletBinding()]
    param()

    if($Script:HostState.Running){
        $Script:HostState.Running=$false
        $Script:HostState.StoppedAt=Get-Date
        Write-JDEngineeringLog -Level Information -Message "Operational Service Host stopped."
    }

    Get-JDOperationalHostStatus
}

function Get-JDOperationalHostStatus {
    [CmdletBinding()]
    param()

    $services = Get-JDOperationalServices

    [pscustomobject]@{
        Name         = $Script:HostState.Name
        Version      = $Script:HostState.Version
        Running      = $Script:HostState.Running
        StartedAt    = $Script:HostState.StartedAt
        StoppedAt    = $Script:HostState.StoppedAt
        ServiceCount = @($services).Count
    }
}

function Get-JDOperationalServices {
    [CmdletBinding()]
    param()

    $script:OperationalRegistry.Values
}

function Get-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if(Test-JDOperationalServiceExists -Name $Name){
        return $script:OperationalRegistry[$Name]
    }

    return $null
}

function Start-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $svc = Get-JDOperationalService -Name $Name
    if(-not $svc){ throw "Service '$Name' not found." }

    $svc.RuntimeStatus.State="RUNNING"
    $svc.UpdatedAt=Get-Date
    Write-JDEngineeringLog -Level Information -Message ("Started service [{0}]." -f $Name)
    $svc
}

function Stop-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $svc = Get-JDOperationalService -Name $Name
    if(-not $svc){ throw "Service '$Name' not found." }

    $svc.RuntimeStatus.State="STOPPED"
    $svc.UpdatedAt=Get-Date
    Write-JDEngineeringLog -Level Information -Message ("Stopped service [{0}]." -f $Name)
    $svc
}

Export-ModuleMember -Function `
Start-JDOperationalHost,`
Stop-JDOperationalHost,`
Get-JDOperationalHostStatus,`
Get-JDOperationalServices,`
Get-JDOperationalService,`
Start-JDOperationalService,`
Stop-JDOperationalService
