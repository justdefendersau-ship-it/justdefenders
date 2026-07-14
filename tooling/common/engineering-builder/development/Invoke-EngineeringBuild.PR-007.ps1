<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-007
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Build Orchestrator
Purpose             : Orchestrates discovery, assembly, validation and reporting.
Timestamp           : 14 July 2026 18:40

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\
Invoke-EngineeringBuild.ps1
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string]$DevelopmentFolder,

    [Parameter(Mandatory)]
    [string]$ModuleName,

    [Parameter(Mandatory)]
    [string]$OutputModule,

    [string]$OutputFolder = (Split-Path -Parent $OutputModule)
)

$target = [JDBuildTarget]::new()
$target.ModuleName   = $ModuleName
$target.SourceFolder = $DevelopmentFolder
$target.OutputFile   = $OutputModule
$target.Version      = "1.0.0"

Write-Host "=== JustDefenders Engineering Builder ==="
Write-Host "Module : $ModuleName"

$manifest = New-JDBuildManifestFromFolder -Target $target

if (-not (Test-JDRevisionSequence -Manifest $manifest)) {
    throw "Revision sequence validation failed."
}

Write-Host ("Revisions discovered: {0}" -f $manifest.Revisions.Count)

$assembled = Save-JDAssembledModule `
    -Manifest $manifest `
    -OutputFile $OutputModule

$result = Test-JDEngineeringModule -ModuleFile $assembled.FullName

$manifestFile = Join-Path $OutputFolder ($ModuleName + ".build.json")
$reportFile   = Join-Path $OutputFolder ($ModuleName + ".BuildReport.md")

Export-JDBuildManifest -Manifest $manifest -OutputFile $manifestFile | Out-Null
Export-JDBuildReport -Result $result -OutputFile $reportFile | Out-Null

Write-Host ""
Write-Host "Build Complete"
Write-Host ("Successful : {0}" -f $result.Successful)
Write-Host ("Module     : {0}" -f $assembled.FullName)
Write-Host ("Manifest   : {0}" -f $manifestFile)
Write-Host ("Report     : {0}" -f $reportFile)

return $result

#==============================================================================
# END OF PRODUCTION REVISION PR-007
#==============================================================================
