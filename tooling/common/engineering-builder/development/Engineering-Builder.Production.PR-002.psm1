<#
==============================================================================
JustDefenders©
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

using namespace System.Collections.Generic

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
