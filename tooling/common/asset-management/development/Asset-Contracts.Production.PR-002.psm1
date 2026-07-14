<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-002
Module              : Asset-Contracts.psm1
Work Package        : WP-Asset-001A.2
Component           : Asset Contracts
Purpose             : Production JDAssetRecord Contract
Timestamp           : 14 July 2026 15:40

File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
Asset-Contracts.Production.PR-002.psm1

Notes
-----
Appends to PR-001. Introduces the complete production implementation of
JDAssetRecord.
#>

class JDAssetRecord : JDContractBase {

    [string]$AssetId
    [string]$RepositoryRoot
    [string]$RelativePath
    [string]$FullPath

    [string]$FileName
    [string]$BaseName
    [string]$Extension

    [Int64]$Length
    [string]$SHA256

    [datetime]$FileCreatedUtc
    [datetime]$LastModifiedUtc
    [datetime]$DiscoveryTimestampUtc

    [string]$MimeType

    [int]$Width
    [int]$Height

    [JDAssetType]$AssetType

    [bool]$Exists
    [bool]$Readable
    [bool]$IsRaster
    [bool]$IsVector
    [bool]$IsAnimated

    JDAssetRecord() : base() {
        $this.ContractName='JDAssetRecord'
        $this.AssetType=[JDAssetType]::Unknown
        $this.DiscoveryTimestampUtc=[datetime]::UtcNow
    }

    JDAssetRecord([string]$RepositoryRoot,[string]$FullPath) : base() {

        $this.ContractName='JDAssetRecord'
        $this.RepositoryRoot=$RepositoryRoot
        $this.FullPath=$FullPath

        $this.Refresh()
    }

    hidden [string] ComputeAssetId() {

        if([string]::IsNullOrWhiteSpace($this.RelativePath)){
            return [Guid]::NewGuid().ToString()
        }

        $normalised=$this.RelativePath.Replace('\','/').ToLowerInvariant()

        $bytes=[System.Text.Encoding]::UTF8.GetBytes($normalised)

        $sha=[System.Security.Cryptography.SHA256]::Create()

        try{
            return ([Convert]::ToHexString($sha.ComputeHash($bytes)))
        }
        finally{
            $sha.Dispose()
        }
    }

    [void] Refresh() {

        if([string]::IsNullOrWhiteSpace($this.FullPath)){ return }

        if(-not (Test-Path -LiteralPath $this.FullPath)){
            $this.Exists=$false
            $this.Readable=$false
            return
        }

        $item=Get-Item -LiteralPath $this.FullPath

        $this.Exists=$true
        $this.Readable=$true

        $this.FileName=$item.Name
        $this.BaseName=[IO.Path]::GetFileNameWithoutExtension($item.Name)
        $this.Extension=$item.Extension.ToLowerInvariant()

        $this.Length=$item.Length
        $this.FileCreatedUtc=$item.CreationTimeUtc
        $this.LastModifiedUtc=$item.LastWriteTimeUtc

        if($this.RepositoryRoot){
            $this.RelativePath=$item.FullName.Substring($this.RepositoryRoot.Length).TrimStart('\','/')
        }

        try{
            $this.SHA256=(Get-FileHash -LiteralPath $item.FullName -Algorithm SHA256).Hash
        }catch{}

        switch($this.Extension){
            '.svg' {$this.AssetType=[JDAssetType]::VectorImage;$this.IsVector=$true}
            '.png' {$this.AssetType=[JDAssetType]::RasterImage;$this.IsRaster=$true}
            '.jpg' {$this.AssetType=[JDAssetType]::RasterImage;$this.IsRaster=$true}
            '.jpeg'{$this.AssetType=[JDAssetType]::RasterImage;$this.IsRaster=$true}
            '.webp'{$this.AssetType=[JDAssetType]::RasterImage;$this.IsRaster=$true}
            '.gif' {$this.AssetType=[JDAssetType]::Animation;$this.IsAnimated=$true}
            '.ico' {$this.AssetType=[JDAssetType]::Icon}
        }

        $this.AssetId=$this.ComputeAssetId()
        $this.Touch()
    }

    [bool] Validate() {

        if([string]::IsNullOrWhiteSpace($this.FullPath)){ return $false }
        if([string]::IsNullOrWhiteSpace($this.AssetId)){ return $false }

        return $this.Exists
    }

    [JDAssetRecord] Clone() {
        $copy=[JDAssetRecord]::new()
        foreach($p in $this.PSObject.Properties){
            try{$copy.($p.Name)=$p.Value}catch{}
        }
        return $copy
    }

    [string] GetSummary() {
        return "{0} [{1}] {2:N0} bytes" -f $this.RelativePath,$this.AssetType,$this.Length
    }
}

#==============================================================================
# END OF PRODUCTION REVISION PR-002
#==============================================================================
