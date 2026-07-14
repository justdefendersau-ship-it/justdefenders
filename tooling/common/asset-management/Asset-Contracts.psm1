<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\Asset-Contracts.psm1

Timestamp:
13 July 2026 19:00

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Purpose:
Defines the canonical contracts used by the JustDefenders Asset Management
subsystem.

Responsibilities:
- Define canonical asset record contracts.
- Define discovery result contracts.
- Define validation result contracts.
- Provide constructors and validators.
- Export public contract functions only.

Dependencies:
PowerShell 7.5+
No external dependencies.

Notes:
Read-only module. No repository modifications.

==============================================================================
#>

Set-StrictMode -Version Latest

$script:AssetContractVersion = [version]'1.0.0'

function New-JDAssetRecord {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$FullPath,
        [Parameter(Mandatory)][string]$RepositoryRoot
    )

    $item = Get-Item -LiteralPath $FullPath

    [pscustomobject]@{
        PSTypeName         = 'JustDefenders.AssetRecord'
        ContractVersion    = $script:AssetContractVersion.ToString()
        AssetId            = $null
        FileName           = $item.Name
        BaseName           = [System.IO.Path]::GetFileNameWithoutExtension($item.Name)
        Extension          = $item.Extension
        FullPath           = $item.FullName
        RelativePath       = Resolve-Path -LiteralPath $item.FullName | ForEach-Object {
            $_.Path.Substring($RepositoryRoot.Length).TrimStart('\','/')
        }
        RepositoryRoot     = $RepositoryRoot
        Length             = $item.Length
        SHA256             = $null
        LastWriteTime      = $item.LastWriteTimeUtc
        Width              = $null
        Height             = $null
        MimeType           = $null
        IsVector           = $false
        IsRaster           = $false
        IsAnimated         = $false
        DiscoveryTimestamp = (Get-Date)
    }
}

function Test-JDAssetRecord {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory,ValueFromPipeline)]
        [psobject]$Asset
    )
    process {
        $required = @(
            'ContractVersion','FileName','Extension','FullPath',
            'RelativePath','RepositoryRoot','Length'
        )

        foreach($property in $required){
            if(-not $Asset.PSObject.Properties.Match($property)){
                return $false
            }
        }

        return $true
    }
}

function Get-JDAssetContractVersion {
    [CmdletBinding()]
    param()
    return $script:AssetContractVersion
}

Export-ModuleMember `
    -Function `
        New-JDAssetRecord,`
        Test-JDAssetRecord,`
        Get-JDAssetContractVersion

#=============================================================================
# END OF FILE
#=============================================================================
