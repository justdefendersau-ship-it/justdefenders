<#
==============================================================================
 JustDefenders ©
 File:
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-Registry.psm1

 Timestamp:
 09 July 2026 13:40

 Work Package:
 WP-S001-02 – Operational Registry

 Version:
 0.2.0 (Registration Engine)

==============================================================================
#>

Set-StrictMode -Version Latest

$Script:OperationalRegistry = @{}

$Script:OperationalRegistryMetadata = [ordered]@{
    Name='Operational-Registry'
    Version='0.2.0'
    WorkPackage='WP-S001-02'
    Initialised=$false
    InitialisedAt=$null
}

Import-Module "$PSScriptRoot\..\Common\Engineering-Common.psm1" -Force -ErrorAction Stop

function Get-JDOperationalRegistryVersion {
    [CmdletBinding()]
    param()
    [pscustomobject]@{
        Name=$Script:OperationalRegistryMetadata.Name
        Version=$Script:OperationalRegistryMetadata.Version
        WorkPackage=$Script:OperationalRegistryMetadata.WorkPackage
        Initialised=$Script:OperationalRegistryMetadata.Initialised
        ServiceCount=$Script:OperationalRegistry.Count
        Timestamp=Get-Date
    }
}

function Initialize-JDOperationalRegistry {
    [CmdletBinding()]
    param()

    $Script:OperationalRegistry.Clear()
    $Script:OperationalRegistryMetadata.Initialised=$true
    $Script:OperationalRegistryMetadata.InitialisedAt=Get-Date

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
        throw "Registration must contain a Name property."
    }

    if($Script:OperationalRegistry.ContainsKey($Registration.Name)){
        throw "Service '$($Registration.Name)' is already registered."
    }

    $record=[pscustomobject]@{
        Registration=$Registration
        RuntimeStatus=[pscustomobject]@{
            State="REGISTERED"
            Health="UNKNOWN"
            Enabled=$true
        }
        Statistics=[ordered]@{}
        Instance=$null
        RegisteredAt=Get-Date
        UpdatedAt=Get-Date
    }

    $Script:OperationalRegistry[$Registration.Name]=$record

    Write-JDEngineeringLog -Level Information -Message ("Registered service [{0}]." -f $Registration.Name)

    return $record
}

function Test-JDOperationalServiceExists {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return $Script:OperationalRegistry.ContainsKey($Name)
}

Export-ModuleMember -Function `
Get-JDOperationalRegistryVersion,`
Initialize-JDOperationalRegistry,`
Clear-JDOperationalRegistry,`
Register-JDOperationalService,`
Test-JDOperationalServiceExists
