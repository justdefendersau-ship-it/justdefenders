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

<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-4_Asset-Contracts.psm1

Timestamp:
13 July 2026 21:20

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
4 - JDValidationFinding / JDReferenceRecord

Purpose:
Defines validation findings and code-to-asset reference contracts used by the
Asset Management subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

class JDValidationFinding : JDContractBase {

    [JDValidationSeverity]$Severity
    [string]$Category
    [string]$Message
    [string]$Recommendation
    [string]$ObjectType
    [string]$ObjectIdentifier
    [datetime]$Timestamp

    JDValidationFinding() : base() {
        $this.ContractName = 'JDValidationFinding'
        $this.Timestamp = Get-Date
        $this.Severity = [JDValidationSeverity]::Information
    }

    [bool] Validate() {
        if ([string]::IsNullOrWhiteSpace($this.Category)) { return $false }
        if ([string]::IsNullOrWhiteSpace($this.Message)) { return $false }
        return $true
    }

    [string] GetSummary() {
        return ("[{0}] {1}: {2}" -f $this.Severity,$this.Category,$this.Message)
    }
}

class JDReferenceRecord : JDContractBase {

    [string]$AssetId
    [string]$Component
    [string]$Page
    [string]$Route
    [string]$SourceFile
    [int]$LineNumber
    [JDReferenceType]$ReferenceType
    [bool]$IsDynamic

    JDReferenceRecord() : base() {
        $this.ContractName = 'JDReferenceRecord'
        $this.ReferenceType = [JDReferenceType]::Unknown
        $this.IsDynamic = $false
    }

    [bool] Validate() {
        if ([string]::IsNullOrWhiteSpace($this.AssetId)) { return $false }
        if ([string]::IsNullOrWhiteSpace($this.SourceFile)) { return $false }
        return $true
    }

    [string] GetSummary() {
        return ("{0} -> {1}:{2}" -f `
            $this.AssetId,
            $this.SourceFile,
            $this.LineNumber)
    }
}

#------------------------------------------------------------------------------
# SECTION 4 END
#------------------------------------------------------------------------------

<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-5_Asset-Contracts.psm1

Timestamp:
13 July 2026 21:40

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
5 - JDDuplicateGroup / JDMissingAsset

Purpose:
Defines duplicate asset grouping and missing asset contracts for the Asset
Management subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

using namespace System.Collections.Generic

class JDDuplicateGroup : JDContractBase {

    [string]$GroupId
    [string]$SHA256
    [List[JDAssetRecord]]$Assets
    [string]$RecommendedCanonicalAssetId

    JDDuplicateGroup() : base() {
        $this.ContractName = 'JDDuplicateGroup'
        $this.GroupId = ([guid]::NewGuid()).ToString()
        $this.Assets = [List[JDAssetRecord]]::new()
    }

    [void] AddAsset([JDAssetRecord]$Asset) {
        if ($null -ne $Asset) {
            $this.Assets.Add($Asset)
        }
    }

    [int] GetDuplicateCount() {
        return [Math]::Max(0, $this.Assets.Count - 1)
    }

    [bool] Validate() {
        return ($this.Assets.Count -gt 1)
    }

    [string] GetSummary() {
        return ("Group {0} | Assets={1} | Duplicates={2}" -f `
            $this.GroupId,
            $this.Assets.Count,
            $this.GetDuplicateCount())
    }
}

class JDMissingAsset : JDContractBase {

    [string]$ExpectedPath
    [string]$ReferencingFile
    [string]$Component
    [string]$Page
    [string]$Route
    [int]$LineNumber
    [string]$Recommendation

    JDMissingAsset() : base() {
        $this.ContractName = 'JDMissingAsset'
    }

    [bool] Validate() {
        return (-not [string]::IsNullOrWhiteSpace($this.ExpectedPath))
    }

    [string] GetSummary() {
        return ("Missing: {0} ({1}:{2})" -f `
            $this.ExpectedPath,
            $this.ReferencingFile,
            $this.LineNumber)
    }
}

#------------------------------------------------------------------------------
# SECTION 5 END
#------------------------------------------------------------------------------

<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-6_Asset-Contracts.psm1

Timestamp:
13 July 2026 22:00

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
6 - JDAuditStatistics / JDAuditSummary

Purpose:
Defines aggregate statistics and audit summary contracts for the Asset
Management subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

using namespace System.Collections.Generic

class JDAuditStatistics : JDContractBase {

    [int]$TotalAssets
    [int]$RasterImages
    [int]$VectorImages
    [int]$AnimatedAssets
    [int]$DuplicateAssets
    [int]$MissingAssets
    [int]$BrokenReferences
    [int]$OrphanedAssets
    [int64]$RepositoryBytes
    [timespan]$Elapsed

    JDAuditStatistics() : base() {
        $this.ContractName = 'JDAuditStatistics'
    }

    [void] Reset() {
        $this.TotalAssets = 0
        $this.RasterImages = 0
        $this.VectorImages = 0
        $this.AnimatedAssets = 0
        $this.DuplicateAssets = 0
        $this.MissingAssets = 0
        $this.BrokenReferences = 0
        $this.OrphanedAssets = 0
        $this.RepositoryBytes = 0
        $this.Elapsed = [timespan]::Zero
        $this.Touch()
    }

    [bool] Validate() {
        return ($this.TotalAssets -ge 0)
    }

    [string] GetSummary() {
        return ("Assets={0} Missing={1} Duplicates={2}" -f
            $this.TotalAssets,
            $this.MissingAssets,
            $this.DuplicateAssets)
    }
}

class JDAuditSummary : JDContractBase {

    [guid]$AuditId
    [datetime]$Generated
    [JDAuditStatistics]$Statistics
    [List[JDValidationFinding]]$Findings
    [bool]$AlphaReady
    [string]$OverallStatus

    JDAuditSummary() : base() {
        $this.ContractName = 'JDAuditSummary'
        $this.AuditId = [guid]::NewGuid()
        $this.Generated = Get-Date
        $this.Statistics = [JDAuditStatistics]::new()
        $this.Findings = [List[JDValidationFinding]]::new()
        $this.AlphaReady = $false
        $this.OverallStatus = 'Unknown'
    }

    [void] AddFinding([JDValidationFinding]$Finding) {
        if($null -ne $Finding){
            $this.Findings.Add($Finding)
        }
    }

    [bool] Validate() {
        return ($null -ne $this.Statistics)
    }

    [string] GetSummary() {
        return ("Status={0} AlphaReady={1} Findings={2}" -f
            $this.OverallStatus,
            $this.AlphaReady,
            $this.Findings.Count)
    }
}

#------------------------------------------------------------------------------
# SECTION 6 END
#------------------------------------------------------------------------------

<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-7_Asset-Contracts.psm1

Timestamp:
13 July 2026 22:20

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
7 - Public API, Module Finalisation and Exports

Purpose:
Provides the public entry points, engineering metadata access and export surface
for the Asset Contracts module.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

function New-JDDiscoverySession {
    [CmdletBinding()]
    param()

    return [JDDiscoverySession]::new()
}

function New-JDDiscoveryResult {
    [CmdletBinding()]
    param()

    return [JDDiscoveryResult]::new()
}

function New-JDValidationFinding {
    [CmdletBinding()]
    param(
        [JDValidationSeverity]$Severity = [JDValidationSeverity]::Information,
        [string]$Category,
        [string]$Message,
        [string]$Recommendation
    )

    $finding = [JDValidationFinding]::new()
    $finding.Severity = $Severity
    $finding.Category = $Category
    $finding.Message = $Message
    $finding.Recommendation = $Recommendation

    return $finding
}

function New-JDAuditSummary {
    [CmdletBinding()]
    param()

    return [JDAuditSummary]::new()
}

function Test-JDContract {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory,ValueFromPipeline)]
        [JDContractBase]$Contract
    )

    process {
        return $Contract.Validate()
    }
}

function Get-JDAssetContractVersion {
    [CmdletBinding()]
    param()

    return [pscustomobject]@{
        ModuleName       = 'Asset-Contracts'
        ModuleVersion    = $script:ModuleInfo.ModuleVersion
        ContractVersion  = $script:ModuleInfo.ContractVersion
        SchemaVersion    = $script:ModuleInfo.SchemaVersion
        WorkPackage      = $script:ModuleInfo.WorkPackage
        BuildTimestamp   = $script:ModuleInfo.BuildTimestamp
    }
}

Export-ModuleMember -Function `
    Get-JDEngineeringModuleInfo,`
    Get-JDAssetContractVersion,`
    New-JDDiscoverySession,`
    New-JDDiscoveryResult,`
    New-JDValidationFinding,`
    New-JDAuditSummary,`
    Test-JDContract

#------------------------------------------------------------------------------
# END OF SECTION 7
#
# NOTE:
# During final engineering assembly all development sections are merged into a
# single production Asset-Contracts.psm1 module. Section 2A and 2B are merged
# into one JDAssetRecord class before validation.
#------------------------------------------------------------------------------

