<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-2B_Asset-Contracts.psm1

Timestamp:
13 July 2026 20:45

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
2B - JDAssetRecord (Behaviour)

Purpose:
Implements behavioural methods for the JDAssetRecord contract.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
#>

class JDAssetRecord {

    [void] Refresh() {

        if (-not (Test-Path -LiteralPath $this.FullPath)) {
            $this.Exists = $false
            $this.Readable = $false
            return
        }

        $item = Get-Item -LiteralPath $this.FullPath

        $this.Exists        = $true
        $this.Readable      = $true
        $this.Length        = $item.Length
        $this.FileCreated   = $item.CreationTimeUtc
        $this.LastWriteTime = $item.LastWriteTimeUtc

        try {
            $hash = Get-FileHash -LiteralPath $this.FullPath -Algorithm SHA256
            $this.SHA256 = $hash.Hash
        }
        catch {
            $this.SHA256 = $null
        }

        $this.Touch()
    }

    [bool] Validate() {

        if ([string]::IsNullOrWhiteSpace($this.FullPath)) { return $false }
        if ([string]::IsNullOrWhiteSpace($this.RepositoryRoot)) { return $false }
        if (-not $this.Exists) { return $false }

        return $true
    }

    [JDAssetRecord] Clone() {

        $copy = [JDAssetRecord]::new()

        foreach($property in $this.PSObject.Properties) {
            try {
                $copy.$($property.Name) = $property.Value
            }
            catch {
                # Ignore read-only or inherited assignment failures.
            }
        }

        $copy.Touch()

        return $copy
    }

    [string] GetSummary() {

        return ("{0} [{1}] ({2:N0} bytes)" -f
            $this.RelativePath,
            $this.AssetType,
            $this.Length)
    }

    [hashtable] ToHashtable() {

        $table = @{}

        foreach($property in $this.PSObject.Properties) {
            $table[$property.Name] = $property.Value
        }

        return $table
    }

    [string] ToJson() {
        return ($this.ToHashtable() | ConvertTo-Json -Depth 10)
    }

}

#------------------------------------------------------------------------------
# SECTION 2B END
#------------------------------------------------------------------------------
