<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\Asset-Contracts.psm1

Timestamp:
13 July 2026 20:15

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
1 - Engineering Foundation

Purpose:
Initialises the Asset Contracts module and defines the common engineering
foundation used by all subsequent contract classes.

Responsibilities:
- Module initialisation
- Engineering metadata
- Enumerations
- Base contract class
- Private helper functions

Dependencies:
PowerShell 7.5+

Notes:
Engineering Exception EE-001 applies. This is Section 1 of the final module.
==============================================================================#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Engineering Metadata
#------------------------------------------------------------------------------
$script:ModuleInfo = [ordered]@{
    Name               = 'Asset-Contracts'
    ModuleVersion      = [version]'1.0.0'
    ContractVersion    = [version]'1.0.0'
    SchemaVersion      = [version]'1.0.0'
    WorkPackage        = 'WP-Asset-001A'
    BuildTimestamp     = Get-Date
    MinimumPSVersion   = [version]'7.5.0'
}

if ($PSVersionTable.PSVersion -lt $script:ModuleInfo.MinimumPSVersion) {
    throw "PowerShell $($script:ModuleInfo.MinimumPSVersion) or later is required."
}

#------------------------------------------------------------------------------
# Enumerations
#------------------------------------------------------------------------------
enum JDValidationSeverity {
    Information
    Warning
    Error
    Critical
}

enum JDAssetType {
    Unknown
    RasterImage
    VectorImage
    Icon
    Font
    Video
    Audio
    Document
    Animation
}

enum JDReferenceType {
    Unknown
    StaticImport
    DynamicImport
    CssReference
    HtmlReference
    RuntimeReference
}

enum JDContractState {
    Draft
    Valid
    Invalid
    Deprecated
}

#------------------------------------------------------------------------------
# Private Helpers
#------------------------------------------------------------------------------
function New-JDInternalGuid {
    [CmdletBinding()]
    param()
    return [guid]::NewGuid()
}

function ConvertTo-JDJsonInternal {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]$InputObject
    )
    return ($InputObject | ConvertTo-Json -Depth 10)
}

#------------------------------------------------------------------------------
# Base Contract
#------------------------------------------------------------------------------
class JDContractBase {

    [guid]$Guid
    [string]$ContractName
    [version]$ContractVersion
    [version]$SchemaVersion
    [datetime]$Created
    [datetime]$Modified
    [JDContractState]$State

    JDContractBase() {
        $this.Guid = [guid]::NewGuid()
        $this.ContractName = $this.GetType().Name
        $this.ContractVersion = [version]'1.0.0'
        $this.SchemaVersion = [version]'1.0.0'
        $this.Created = Get-Date
        $this.Modified = $this.Created
        $this.State = [JDContractState]::Draft
    }

    [void] Touch() {
        $this.Modified = Get-Date
    }

    [bool] Validate() {
        return ($this.Guid -ne [guid]::Empty)
    }

    [hashtable] ToHashtable() {
        $h = @{}
        foreach($p in $this.PSObject.Properties){
            $h[$p.Name] = $p.Value
        }
        return $h
    }

    [string] ToJson() {
        return ($this.ToHashtable() | ConvertTo-Json -Depth 10)
    }

    [string] GetSummary() {
        return "{0} [{1}] ({2})" -f $this.ContractName,$this.ContractVersion,$this.Guid
    }
}

function Get-JDEngineeringModuleInfo {
    [CmdletBinding()]
    param()
    return [pscustomobject]$script:ModuleInfo
}

#------------------------------------------------------------------------------
# SECTION 1 END
#------------------------------------------------------------------------------
