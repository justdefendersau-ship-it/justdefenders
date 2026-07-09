<#
==============================================================================
 JustDefenders ©
 File:
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-ServiceHost.psm1

 Timestamp:
 09 July 2026 15:30

 Work Package:
 WP-S001-03 – Operational Service Host

 Version:
 0.1.0 (Foundation)
==============================================================================#>

Set-StrictMode -Version Latest

Import-Module "$PSScriptRoot\..\Common\Engineering-Common.psm1" -Force -ErrorAction Stop
Import-Module "$PSScriptRoot\Operational-Registry.psm1" -Force -ErrorAction Stop

$Script:HostState = [ordered]@{
    Name        = "JustDefenders Operational Service Host"
    Version     = "0.1.0"
    Running     = $false
    StartedAt   = $null
    StoppedAt   = $null
}

function Start-JDOperationalHost {
    [CmdletBinding()]
    param()

    if(-not $Script:HostState.Running){
        Initialize-JDOperationalRegistry | Out-Null
        $Script:HostState.Running = $true
        $Script:HostState.StartedAt = Get-Date

        Write-JDEngineeringLog `
            -Level Information `
            -Message "Operational Service Host started."
    }

    return (Get-JDOperationalHostStatus)
}

function Stop-JDOperationalHost {
    [CmdletBinding()]
    param()

    if($Script:HostState.Running){
        $Script:HostState.Running = $false
        $Script:HostState.StoppedAt = Get-Date

        Write-JDEngineeringLog `
            -Level Information `
            -Message "Operational Service Host stopped."
    }

    return (Get-JDOperationalHostStatus)
}

function Get-JDOperationalHostStatus {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Name      = $Script:HostState.Name
        Version   = $Script:HostState.Version
        Running   = $Script:HostState.Running
        StartedAt = $Script:HostState.StartedAt
        StoppedAt = $Script:HostState.StoppedAt
    }
}

Export-ModuleMember -Function `
    Start-JDOperationalHost,`
    Stop-JDOperationalHost,`
    Get-JDOperationalHostStatus
