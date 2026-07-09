<#
==============================================================================
 JustDefenders ©
 File:
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-Registry.psm1

 Timestamp:
 09 July 2026 16:00

 Work Package:
 WP-S001-02 – Operational Registry

 Version:
 0.3.0 (Public Registry API)

 Description:
 Registry is the authoritative owner of all operational service state.
==============================================================================#>

Set-StrictMode -Version Latest

Import-Module "$PSScriptRoot\..\Common\Engineering-Common.psm1" -Force -ErrorAction Stop

$Script:OperationalRegistry = @{}

$Script:RegistryInfo = [ordered]@{
    Name        = "Operational-Registry"
    Version     = "0.3.0"
    Initialised = $false
    StartedAt   = $null
}

function Initialize-JDOperationalRegistry {
    [CmdletBinding()]
    param()

    $Script:OperationalRegistry.Clear()
    $Script:RegistryInfo.Initialised = $true
    $Script:RegistryInfo.StartedAt = Get-Date

    Write-JDEngineeringLog -Level Information -Message "Operational Registry initialised."
    return $true
}

function Clear-JDOperationalRegistry {
    [CmdletBinding()]
    param()

    $Script:OperationalRegistry.Clear()

    Write-JDEngineeringLog -Level Information -Message "Operational Registry cleared."
    return $true
}

function Register-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [psobject]$Registration
    )

    if([string]::IsNullOrWhiteSpace($Registration.Name)){
        throw "Registration.Name is required."
    }

    if($Script:OperationalRegistry.ContainsKey($Registration.Name)){
        throw "Service '$($Registration.Name)' already exists."
    }

    $record = [pscustomobject]@{
        Name         = $Registration.Name
        Registration = $Registration
        RuntimeStatus = [pscustomobject]@{
            State   = "REGISTERED"
            Health  = "UNKNOWN"
            Enabled = $true
        }
        Statistics  = @{}
        Instance    = $null
        RegisteredAt = Get-Date
        UpdatedAt    = Get-Date
    }

    $Script:OperationalRegistry[$Registration.Name] = $record

    Write-JDEngineeringLog -Level Information -Message ("Registered service [{0}]." -f $Registration.Name)

    return $record
}

function Get-JDOperationalServices {
    [CmdletBinding()]
    param()

    return @($Script:OperationalRegistry.Values)
}

function Get-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if($Script:OperationalRegistry.ContainsKey($Name)){
        return $Script:OperationalRegistry[$Name]
    }

    return $null
}

function Test-JDOperationalServiceExists {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return $Script:OperationalRegistry.ContainsKey($Name)
}

function Update-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [hashtable]$Properties
    )

    $service = Get-JDOperationalService -Name $Name
    if(-not $service){
        throw "Service '$Name' not found."
    }

    foreach($key in $Properties.Keys){
        if($service.PSObject.Properties.Match($key).Count -gt 0){
            $service.$key = $Properties[$key]
        }
    }

    $service.UpdatedAt = Get-Date
    return $service
}

function Unregister-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if(-not $Script:OperationalRegistry.ContainsKey($Name)){
        return $false
    }

    $null = $Script:OperationalRegistry.Remove($Name)

    Write-JDEngineeringLog -Level Information -Message ("Unregistered service [{0}]." -f $Name)

    return $true
}

function Get-JDOperationalRegistryVersion {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Name         = $Script:RegistryInfo.Name
        Version      = $Script:RegistryInfo.Version
        Initialised  = $Script:RegistryInfo.Initialised
        ServiceCount = $Script:OperationalRegistry.Count
        Timestamp    = Get-Date
    }
}

Export-ModuleMember -Function `
Initialize-JDOperationalRegistry,`
Clear-JDOperationalRegistry,`
Register-JDOperationalService,`
Get-JDOperationalServices,`
Get-JDOperationalService,`
Test-JDOperationalServiceExists,`
Update-JDOperationalService,`
Unregister-JDOperationalService,`
Get-JDOperationalRegistryVersion
