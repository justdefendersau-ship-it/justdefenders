#
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Operational-Runtime.psm1
# PR-011A - Operational Runtime Foundation
# Timestamp: 25 July 2026
#

Set-StrictMode -Version Latest

$script:OperationalRuntime = [ordered]@{
    Version = '1.0.0-pr011a'
    Initialised = Get-Date
    Services = @{}
}

function Get-JDOperationalRuntimeMetadata {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Name        = 'Operational-Runtime'
        Version     = $script:OperationalRuntime.Version
        Initialised = $script:OperationalRuntime.Initialised
        ServiceCount= $script:OperationalRuntime.Services.Count
    }
}

function Register-JDRuntimeService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if(-not $script:OperationalRuntime.Services.Contains($Name)){
        $script:OperationalRuntime.Services[$Name] = [ordered]@{
            Name = $Name
            State = 'Registered'
            LastUpdated = Get-Date
        }
    }

    [pscustomobject]$script:OperationalRuntime.Services[$Name]
}

function Start-JDRuntimeService {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Name)

    Register-JDRuntimeService -Name $Name | Out-Null
    $svc = $script:OperationalRuntime.Services[$Name]
    $svc.State = 'Running'
    $svc.LastUpdated = Get-Date
    [pscustomobject]$svc
}

function Stop-JDRuntimeService {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Name)

    Register-JDRuntimeService -Name $Name | Out-Null
    $svc = $script:OperationalRuntime.Services[$Name]
    $svc.State = 'Stopped'
    $svc.LastUpdated = Get-Date
    [pscustomobject]$svc
}

function Get-JDRuntimeHealth {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Name)

    Register-JDRuntimeService -Name $Name | Out-Null
    $svc = $script:OperationalRuntime.Services[$Name]

    [pscustomobject]@{
        Name = $svc.Name
        State = $svc.State
        Healthy = $svc.State -eq 'Running'
        LastUpdated = $svc.LastUpdated
    }
}

Export-ModuleMember -Function `
    Get-JDOperationalRuntimeMetadata,`
    Register-JDRuntimeService,`
    Start-JDRuntimeService,`
    Stop-JDRuntimeService,`
    Get-JDRuntimeHealth
