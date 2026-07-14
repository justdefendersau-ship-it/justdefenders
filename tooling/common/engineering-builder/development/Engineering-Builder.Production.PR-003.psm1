<#
==============================================================================
JustDefenders©
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

Export-ModuleMember -Function `
    Get-JDProductionRevisionFiles,`
    New-JDBuildManifestFromFolder,`
    Test-JDRevisionSequence

#==============================================================================
# END OF PRODUCTION REVISION PR-003
#==============================================================================
