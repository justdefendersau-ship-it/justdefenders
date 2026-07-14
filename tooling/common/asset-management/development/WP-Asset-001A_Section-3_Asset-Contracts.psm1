<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-3_Asset-Contracts.psm1

Timestamp:
13 July 2026 21:00

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
3 - JDDiscoverySession / JDDiscoveryResult

Purpose:
Defines the canonical discovery session and discovery result contracts used by
Asset-Discovery.psm1.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

using namespace System.Collections.Generic

class JDDiscoverySession : JDContractBase {

    [guid]$SessionId
    [string]$RepositoryRoot

    [datetime]$StartTime
    [datetime]$EndTime

    [List[string]]$SupportedExtensions
    [List[string]]$IgnoredDirectories
    [List[string]]$Warnings
    [List[string]]$Errors

    [Dictionary[string,string]]$Configuration

    JDDiscoverySession() : base() {
        $this.ContractName = 'JDDiscoverySession'
        $this.SessionId = [guid]::NewGuid()
        $this.SupportedExtensions = [List[string]]::new()
        $this.IgnoredDirectories = [List[string]]::new()
        $this.Warnings = [List[string]]::new()
        $this.Errors = [List[string]]::new()
        $this.Configuration = [Dictionary[string,string]]::new()
    }

    [void] Start() {
        $this.StartTime = Get-Date
        $this.Touch()
    }

    [void] Complete() {
        $this.EndTime = Get-Date
        $this.Touch()
    }

    [void] AddWarning([string]$Message) {
        if(-not [string]::IsNullOrWhiteSpace($Message)){
            $this.Warnings.Add($Message)
        }
    }

    [void] AddError([string]$Message) {
        if(-not [string]::IsNullOrWhiteSpace($Message)){
            $this.Errors.Add($Message)
        }
    }

    [bool] Validate() {
        return (-not [string]::IsNullOrWhiteSpace($this.RepositoryRoot))
    }

    [string] GetSummary() {
        return ("Session {0} | Warnings={1} Errors={2}" -f `
            $this.SessionId,
            $this.Warnings.Count,
            $this.Errors.Count)
    }
}

class JDDiscoveryResult : JDContractBase {

    [List[JDAssetRecord]]$Assets
    [List[string]]$ValidationFindings

    [bool]$Successful
    [timespan]$Duration

    JDDiscoveryResult() : base() {
        $this.ContractName = 'JDDiscoveryResult'
        $this.Assets = [List[JDAssetRecord]]::new()
        $this.ValidationFindings = [List[string]]::new()
        $this.Successful = $true
    }

    [void] AddAsset([JDAssetRecord]$Asset) {
        if($null -ne $Asset){
            $this.Assets.Add($Asset)
        }
    }

    [void] AddFinding([string]$Finding) {
        if(-not [string]::IsNullOrWhiteSpace($Finding)){
            $this.ValidationFindings.Add($Finding)
        }
    }

    [bool] Validate() {
        return ($this.Assets.Count -ge 0)
    }

    [string] GetSummary() {
        return ("Assets={0} Findings={1} Success={2}" -f `
            $this.Assets.Count,
            $this.ValidationFindings.Count,
            $this.Successful)
    }
}

#------------------------------------------------------------------------------
# SECTION 3 END
#------------------------------------------------------------------------------
