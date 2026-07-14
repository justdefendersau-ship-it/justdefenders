<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-003
Module              : Asset-Contracts.psm1
Work Package        : WP-Asset-001A.2
Component           : Asset Contracts
Purpose             : Production Discovery Contracts
Timestamp           : 14 July 2026 15:55

File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
Asset-Contracts.Production.PR-003.psm1

Notes
-----
Appends to PR-001 and PR-002. Introduces the production discovery contracts.
#>

using namespace System.Collections.Generic

class JDDiscoverySession : JDContractBase {

    [guid]$SessionId
    [string]$RepositoryRoot
    [datetime]$StartTimeUtc
    [datetime]$EndTimeUtc

    [List[string]]$SupportedExtensions
    [List[string]]$IgnoredDirectories
    [List[string]]$Warnings
    [List[string]]$Errors
    [Dictionary[string,string]]$Configuration

    JDDiscoverySession() : base() {
        $this.ContractName='JDDiscoverySession'
        $this.SessionId=[guid]::NewGuid()
        $this.SupportedExtensions=[List[string]]::new()
        $this.IgnoredDirectories=[List[string]]::new()
        $this.Warnings=[List[string]]::new()
        $this.Errors=[List[string]]::new()
        $this.Configuration=[Dictionary[string,string]]::new()
    }

    [void]Start(){
        $this.StartTimeUtc=[datetime]::UtcNow
        $this.Touch()
    }

    [void]Complete(){
        $this.EndTimeUtc=[datetime]::UtcNow
        $this.Touch()
    }

    [void]AddWarning([string]$Message){
        if(-not [string]::IsNullOrWhiteSpace($Message)){
            $this.Warnings.Add($Message)
        }
    }

    [void]AddError([string]$Message){
        if(-not [string]::IsNullOrWhiteSpace($Message)){
            $this.Errors.Add($Message)
        }
    }

    [timespan]GetElapsed(){
        if($this.EndTimeUtc -gt $this.StartTimeUtc){
            return ($this.EndTimeUtc - $this.StartTimeUtc)
        }
        return [timespan]::Zero
    }

    [bool]Validate(){
        return -not [string]::IsNullOrWhiteSpace($this.RepositoryRoot)
    }

    [string]GetSummary(){
        return "Discovery Session {0} W:{1} E:{2}" -f $this.SessionId,$this.Warnings.Count,$this.Errors.Count
    }
}

class JDDiscoveryResult : JDContractBase {

    [List[JDAssetRecord]]$Assets
    [List[string]]$ValidationMessages
    [bool]$Successful
    [timespan]$Duration

    JDDiscoveryResult() : base() {
        $this.ContractName='JDDiscoveryResult'
        $this.Assets=[List[JDAssetRecord]]::new()
        $this.ValidationMessages=[List[string]]::new()
        $this.Successful=$true
        $this.Duration=[timespan]::Zero
    }

    [void]AddAsset([JDAssetRecord]$Asset){
        if($null -ne $Asset){
            $this.Assets.Add($Asset)
        }
    }

    [void]AddValidationMessage([string]$Message){
        if(-not [string]::IsNullOrWhiteSpace($Message)){
            $this.ValidationMessages.Add($Message)
        }
    }

    [bool]Validate(){
        return ($this.Assets.Count -ge 0)
    }

    [string]GetSummary(){
        return "Assets={0} Messages={1} Success={2}" -f $this.Assets.Count,$this.ValidationMessages.Count,$this.Successful
    }
}

#==============================================================================
# END OF PRODUCTION REVISION PR-003
#==============================================================================
