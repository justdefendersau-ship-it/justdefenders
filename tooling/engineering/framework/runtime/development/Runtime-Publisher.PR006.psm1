<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 11:10
Work Package       : WP-JDEF-001B
Production Revision: PR-006
Component          : Runtime Publisher
Version            : 1.0.0

File:
C:\dev\justdefenders\frontend\tooling\engineering\framework\runtime\development\Runtime-Publisher.PR006.psm1

Purpose:
    Publishes validated runtime manifests as composed runtime instances.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

class JDRuntimePublication {

    [string]$Name
    [datetime]$PublishedAt
    [string]$Version='1.0.0'
    [object]$Manifest
    [bool]$Published=$false
}

class JDRuntimePublisher {

    [JDRuntimePublication] Publish(
        [object]$Manifest,
        [object]$ValidationResult
    ) {

        if($null -eq $Manifest){
            throw "Manifest cannot be null."
        }

        if($null -eq $ValidationResult){
            throw "Validation result cannot be null."
        }

        if(-not $ValidationResult.Successful){
            throw "Runtime publication refused because validation failed."
        }

        $publication=[JDRuntimePublication]::new()
        $publication.Name=$Manifest.Name
        $publication.Manifest=$Manifest
        $publication.PublishedAt=Get-Date
        $publication.Published=$true

        return $publication
    }
}

function New-JDRuntimePublisher {
    [CmdletBinding()]
    param()

    return [JDRuntimePublisher]::new()
}

Export-ModuleMember -Function New-JDRuntimePublisher
