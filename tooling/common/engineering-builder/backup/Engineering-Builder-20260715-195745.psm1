using namespace System
using namespace System.Collections.Generic

#------------------------------------------------------------------------------
# BEGIN Engineering-Builder.Production.PR-001.psm1
#------------------------------------------------------------------------------
<#
==============================================================================
JustDefendersÂ©
==============================================================================
Production Revision : PR-001
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Engineering Foundation
Purpose             : Foundation for the JustDefenders Engineering Module Builder
Timestamp           : 14 July 2026 16:55

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-001.psm1

Responsibilities
----------------
- Establish builder foundation
- Define module metadata
- Define build enums
- Define base engineering contract
- Expose engineering metadata

Dependencies
------------
PowerShell 7.5+
#>


Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

$script:BuilderInfo=[ordered]@{
    ModuleName='Engineering-Builder'
    ModuleVersion='1.0.0-pr001'
    WorkPackage='WP-BUILD-001'
    ProductionRevision='PR-001'
    EngineeringStatus='Production Candidate'
    BuildTimestamp='2026-07-14 16:55'
    MinimumPSVersion='7.5'
}

enum JDBuildStatus {
    Unknown
    Pending
    InProgress
    Passed
    Failed
}

enum JDRevisionType {
    Production
    Prototype
    Development
}

class JDEngineeringContract {

    [Guid]$Id
    [string]$Name
    [datetime]$CreatedUtc
    [datetime]$ModifiedUtc

    JDEngineeringContract() {
        $this.Id=[Guid]::NewGuid()
        $this.CreatedUtc=[datetime]::UtcNow
        $this.ModifiedUtc=$this.CreatedUtc
    }

    [void] Touch() {
        $this.ModifiedUtc=[datetime]::UtcNow
    }

    [bool] Validate() {
        return -not [string]::IsNullOrWhiteSpace($this.Name)
    }

    [hashtable] ToHashtable() {
        $h=@{}
        foreach($p in $this.PSObject.Properties){
            $h[$p.Name]=$p.Value
        }
        return $h
    }

    [string] ToJson() {
        return ($this.ToHashtable() | ConvertTo-Json -Depth 10)
    }
}

function Get-JDEngineeringBuilderInfo {
    [CmdletBinding()]
    param()

    [pscustomobject]$script:BuilderInfo
}


#==============================================================================
# END OF PRODUCTION REVISION PR-001
#==============================================================================


#------------------------------------------------------------------------------
# END Engineering-Builder.Production.PR-001.psm1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# BEGIN Engineering-Builder.Production.PR-002.psm1
#------------------------------------------------------------------------------
<#
==============================================================================
JustDefendersÂ©
==============================================================================
Production Revision : PR-002
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Builder Contracts
Purpose             : Defines generic build contracts used by the Engineering
                      Module Builder.
Timestamp           : 14 July 2026 17:10

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-002.psm1
#>


class JDBuildTarget : JDEngineeringContract {

    [string]$ModuleName
    [string]$SourceFolder
    [string]$OutputFile
    [string]$Version
    [List[string]]$RevisionFiles

    JDBuildTarget() : base() {
        $this.Name='JDBuildTarget'
        $this.RevisionFiles=[List[string]]::new()
    }

    [void] AddRevision([string]$RevisionFile){
        if(-not [string]::IsNullOrWhiteSpace($RevisionFile)){
            $this.RevisionFiles.Add($RevisionFile)
        }
    }
}

class JDRevision : JDEngineeringContract {

    [int]$Sequence
    [string]$RevisionId
    [string]$FileName
    [JDBuildStatus]$Status

    JDRevision() : base() {
        $this.Name='JDRevision'
        $this.Status=[JDBuildStatus]::Pending
    }
}

class JDBuildManifest : JDEngineeringContract {

    [JDBuildTarget]$Target
    [List[JDRevision]]$Revisions

    JDBuildManifest() : base() {
        $this.Name='JDBuildManifest'
        $this.Revisions=[List[JDRevision]]::new()
    }

    [void] AddRevision([JDRevision]$Revision){
        if($null -ne $Revision){
            $this.Revisions.Add($Revision)
        }
    }
}

class JDBuildResult : JDEngineeringContract {

    [bool]$Successful
    [datetime]$StartedUtc
    [datetime]$CompletedUtc
    [List[string]]$Messages
    [string]$OutputFile

    JDBuildResult() : base() {
        $this.Name='JDBuildResult'
        $this.Messages=[List[string]]::new()
        $this.Successful=$false
    }

    [void] AddMessage([string]$Message){
        if(-not [string]::IsNullOrWhiteSpace($Message)){
            $this.Messages.Add($Message)
        }
    }
}

#==============================================================================
# END OF PRODUCTION REVISION PR-002
#==============================================================================


#------------------------------------------------------------------------------
# END Engineering-Builder.Production.PR-002.psm1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# BEGIN Engineering-Builder.Production.PR-003.psm1
#------------------------------------------------------------------------------
<#
==============================================================================
JustDefendersÂ©
==============================================================================
Production Revision : PR-003
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Revision Discovery Engine
Purpose             : Discover, validate and order production revision files.
Timestamp           : 14 July 2026 17:25

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-003.psm1
#>

function Get-JDProductionRevisionFiles {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$DevelopmentFolder
    )

    if(-not (Test-Path -LiteralPath $DevelopmentFolder)){
        throw "Development folder not found: $DevelopmentFolder"
    }

    Get-ChildItem -LiteralPath $DevelopmentFolder -File -Filter '*.Production.PR-*.psm1' |
        Sort-Object Name
}

function New-JDBuildManifestFromFolder {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [JDBuildTarget]$Target
    )

    $manifest = [JDBuildManifest]::new()
    $manifest.Target = $Target

    $files = Get-JDProductionRevisionFiles -DevelopmentFolder $Target.SourceFolder

    $sequence = 1
    foreach($file in $files){

        if($file.Name -notmatch '\.PR-(\d+)'){
            continue
        }

        $revision = [JDRevision]::new()
        $revision.Sequence = $sequence
        $revision.RevisionId = ('PR-{0}' -f $Matches[1].PadLeft(3,'0'))
        $revision.FileName = $file.FullName
        $revision.Status = [JDBuildStatus]::Pending

        $manifest.AddRevision($revision)
        $Target.AddRevision($file.FullName)

        $sequence++
    }

    return $manifest
}

function Test-JDRevisionSequence {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [JDBuildManifest]$Manifest
    )

    $expected = 1

    foreach($revision in $Manifest.Revisions){
        if($revision.Sequence -ne $expected){
            return $false
        }
        $expected++
    }

    return $true
}

    Get-JDProductionRevisionFiles,`
    New-JDBuildManifestFromFolder,`
    Test-JDRevisionSequence

#==============================================================================
# END OF PRODUCTION REVISION PR-003
#==============================================================================


#------------------------------------------------------------------------------
# END Engineering-Builder.Production.PR-003.psm1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# BEGIN Engineering-Builder.Production.PR-004.psm1
#------------------------------------------------------------------------------
<#
==============================================================================
JustDefendersÂ©
==============================================================================
Production Revision : PR-004
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Assembly Engine
Purpose             : Assemble production revisions into a single module.
Timestamp           : 14 July 2026 17:45

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-004.psm1
#>

function Join-JDModuleContent {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [JDBuildManifest]$Manifest
    )

    $builder = [System.Text.StringBuilder]::new()

    foreach($revision in ($Manifest.Revisions | Sort-Object Sequence)) {

        $content = Get-Content -LiteralPath $revision.FileName -Raw

        [void]$builder.AppendLine(
"# -----------------------------------------------------------------------------")
        [void]$builder.AppendLine(
"# BEGIN $($revision.RevisionId) : $([IO.Path]::GetFileName($revision.FileName))")
        [void]$builder.AppendLine(
"# -----------------------------------------------------------------------------")
        [void]$builder.AppendLine($content)
        [void]$builder.AppendLine(
"# -----------------------------------------------------------------------------")
        [void]$builder.AppendLine("# END $($revision.RevisionId)")
        [void]$builder.AppendLine()
    }

    return $builder.ToString()
}

function Test-JDDuplicateSymbols {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ModuleContent
    )

    $classes = [regex]::Matches($ModuleContent,'(?m)^\s*class\s+([A-Za-z0-9_]+)') |
        ForEach-Object {$_.Groups[1].Value}

    $functions = [regex]::Matches($ModuleContent,'(?m)^\s*function\s+([A-Za-z0-9_-]+)') |
        ForEach-Object {$_.Groups[1].Value}

    [pscustomobject]@{
        DuplicateClasses  = $classes | Group-Object | Where-Object Count -gt 1
        DuplicateFunctions= $functions | Group-Object | Where-Object Count -gt 1
    }
}

function Save-JDAssembledModule {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildManifest]$Manifest,
        [Parameter(Mandatory)][string]$OutputFile
    )

    $content = Join-JDModuleContent -Manifest $Manifest

    Set-Content -LiteralPath $OutputFile -Value $content -Encoding UTF8

    return (Get-Item -LiteralPath $OutputFile)
}

    Join-JDModuleContent,`
    Test-JDDuplicateSymbols,`
    Save-JDAssembledModule

#==============================================================================
# END OF PRODUCTION REVISION PR-004
#==============================================================================


#------------------------------------------------------------------------------
# END Engineering-Builder.Production.PR-004.psm1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# BEGIN Engineering-Builder.Production.PR-005.psm1
#------------------------------------------------------------------------------
<#
==============================================================================
JustDefendersÂ©
==============================================================================
Production Revision : PR-005
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Validation Engine
Purpose             : Validate assembled engineering modules before promotion.
Timestamp           : 14 July 2026 18:00

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-005.psm1
#>

function Test-JDModuleFileExists {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    return (Test-Path -LiteralPath $ModuleFile -PathType Leaf)
}

function Test-JDModuleSyntax {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    $tokens = $null
    $errors = $null

    [void][System.Management.Automation.Language.Parser]::ParseFile(
        $ModuleFile,
        [ref]$tokens,
        [ref]$errors
    )

    [pscustomobject]@{
        Passed = ($errors.Count -eq 0)
        ErrorCount = $errors.Count
        Errors = $errors
    }
}

function Test-JDUsingStatements {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    $lines = Get-Content -LiteralPath $ModuleFile

    $firstClass = ($lines | Select-String '^\s*class\s+' | Select-Object -First 1).LineNumber
    $invalid = @()

    foreach($match in ($lines | Select-String '^\s*using\s+namespace')){
        if($firstClass -and $match.LineNumber -gt $firstClass){
            $invalid += $match.LineNumber
        }
    }

    [pscustomobject]@{
        Passed = ($invalid.Count -eq 0)
        InvalidLines = $invalid
    }
}

function Test-JDEngineeringModule {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    $result = [JDBuildResult]::new()
    $result.StartedUtc = [datetime]::UtcNow
    $result.OutputFile = $ModuleFile

    if(-not (Test-JDModuleFileExists $ModuleFile)){
        $result.AddMessage("Module file not found.")
        return $result
    }

    $syntax = Test-JDModuleSyntax -ModuleFile $ModuleFile
    $using = Test-JDUsingStatements -ModuleFile $ModuleFile

    $result.AddMessage("Syntax Passed: $($syntax.Passed)")
    $result.AddMessage("Using Statements Passed: $($using.Passed)")

    $result.Successful = ($syntax.Passed -and $using.Passed)
    $result.CompletedUtc = [datetime]::UtcNow

    return $result
}

    Test-JDModuleFileExists,`
    Test-JDModuleSyntax,`
    Test-JDUsingStatements,`
    Test-JDEngineeringModule

#==============================================================================
# END OF PRODUCTION REVISION PR-005
#==============================================================================


#------------------------------------------------------------------------------
# END Engineering-Builder.Production.PR-005.psm1
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# BEGIN Engineering-Builder.Production.PR-006.psm1
#------------------------------------------------------------------------------
<#
==============================================================================
JustDefendersÂ©
==============================================================================
Production Revision : PR-006
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Reporting Engine
Purpose             : Generate build reports and manifests.
Timestamp           : 14 July 2026 18:20

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-006.psm1
#>

function New-JDBuildManifestObject {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildManifest]$Manifest
    )

    [pscustomobject]@{
        ModuleName = $Manifest.Target.ModuleName
        Version    = $Manifest.Target.Version
        RevisionCount = $Manifest.Revisions.Count
        Revisions  = $Manifest.Revisions.RevisionId
        GeneratedUtc = [datetime]::UtcNow
    }
}

function Export-JDBuildManifest {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildManifest]$Manifest,
        [Parameter(Mandatory)][string]$OutputFile
    )

    $obj = New-JDBuildManifestObject -Manifest $Manifest
    $obj | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $OutputFile -Encoding UTF8
    Get-Item -LiteralPath $OutputFile
}

function Export-JDBuildReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildResult]$Result,
        [Parameter(Mandatory)][string]$OutputFile
    )

    $lines = @(
        '# JustDefenders Engineering Build Report',
        '',
        ('Generated UTC : {0}' -f ([datetime]::UtcNow)),
        ('Module        : {0}' -f $Result.OutputFile),
        ('Successful    : {0}' -f $Result.Successful),
        '',
        'Messages',
        '--------'
    )

    $lines += $Result.Messages

    Set-Content -LiteralPath $OutputFile -Value $lines -Encoding UTF8
    Get-Item -LiteralPath $OutputFile
}

function Show-JDBuildSummary {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildResult]$Result
    )

    [pscustomobject]@{
        Successful = $Result.Successful
        StartedUtc = $Result.StartedUtc
        CompletedUtc = $Result.CompletedUtc
        MessageCount = $Result.Messages.Count
        OutputFile = $Result.OutputFile
    }
}

    New-JDBuildManifestObject,`
    Export-JDBuildManifest,`
    Export-JDBuildReport,`
    Show-JDBuildSummary

#==============================================================================
# END OF PRODUCTION REVISION PR-006
#==============================================================================


#------------------------------------------------------------------------------
# END Engineering-Builder.Production.PR-006.psm1
#------------------------------------------------------------------------------


Export-ModuleMember -Function `

