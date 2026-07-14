<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-2A_Asset-Contracts.psm1

Timestamp:
13 July 2026 20:30

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
2A - JDAssetRecord (Core)

Purpose:
Defines the canonical asset contract used throughout the Asset Management
subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
#>

class JDAssetRecord : JDContractBase {

    [string]$AssetId
    [string]$FileName
    [string]$BaseName
    [string]$Extension

    [string]$FullPath
    [string]$RelativePath
    [string]$RepositoryRoot

    [Int64]$Length
    [string]$SHA256

    [datetime]$FileCreated
    [datetime]$LastWriteTime

    [string]$MimeType

    [int]$Width
    [int]$Height

    [JDAssetType]$AssetType

    [bool]$IsVector
    [bool]$IsRaster
    [bool]$IsAnimated
    [bool]$Exists
    [bool]$Readable

    [datetime]$DiscoveryTimestamp

    JDAssetRecord() : base() {
        $this.ContractName = 'JDAssetRecord'
        $this.AssetType = [JDAssetType]::Unknown
        $this.DiscoveryTimestamp = Get-Date
        $this.Exists = $false
        $this.Readable = $false
    }

    JDAssetRecord([string]$FullPath,[string]$RepositoryRoot) : base() {

        $this.ContractName = 'JDAssetRecord'

        $this.RepositoryRoot = $RepositoryRoot
        $this.FullPath       = $FullPath

        if(Test-Path -LiteralPath $FullPath){

            $item = Get-Item -LiteralPath $FullPath

            $this.Exists = $true
            $this.Readable = $true

            $this.FileName = $item.Name
            $this.BaseName = [System.IO.Path]::GetFileNameWithoutExtension($item.Name)
            $this.Extension = $item.Extension.ToLowerInvariant()

            $this.Length = $item.Length
            $this.FileCreated = $item.CreationTimeUtc
            $this.LastWriteTime = $item.LastWriteTimeUtc

            $this.RelativePath = $item.FullName.Substring(
                $RepositoryRoot.Length
            ).TrimStart('\','/')

            switch($this.Extension){
                '.svg' {
                    $this.AssetType = [JDAssetType]::VectorImage
                    $this.IsVector = $true
                }

                '.png' { $this.AssetType = [JDAssetType]::RasterImage; $this.IsRaster = $true }
                '.jpg' { $this.AssetType = [JDAssetType]::RasterImage; $this.IsRaster = $true }
                '.jpeg'{ $this.AssetType = [JDAssetType]::RasterImage; $this.IsRaster = $true }
                '.webp'{ $this.AssetType = [JDAssetType]::RasterImage; $this.IsRaster = $true }
                '.gif' {
                    $this.AssetType = [JDAssetType]::Animation
                    $this.IsAnimated = $true
                }

                '.ico' {
                    $this.AssetType = [JDAssetType]::Icon
                }

                default {
                    $this.AssetType = [JDAssetType]::Unknown
                }
            }

            $this.AssetId = [guid]::NewGuid().ToString()
            $this.DiscoveryTimestamp = Get-Date
        }
    }

}

#------------------------------------------------------------------------------
# SECTION 2A END
#------------------------------------------------------------------------------
