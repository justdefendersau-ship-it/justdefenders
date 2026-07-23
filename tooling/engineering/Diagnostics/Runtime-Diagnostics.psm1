<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Runtime-Diagnostics.psm1

Work Package
    PR-006D.1 - Engineering Runtime Diagnostics

Purpose
    Bootstrap module for the Engineering Runtime Diagnostics subsystem.
==============================================================================#>

Set-StrictMode -Version Latest

$engineeringCommon = Join-Path $PSScriptRoot "..\Services\Engineering-Common.psm1"

if (Test-Path $engineeringCommon) {
    Import-Module $engineeringCommon -Force
}

$privateFolder = Join-Path $PSScriptRoot "Private"
if (Test-Path $privateFolder) {
    Get-ChildItem $privateFolder -Filter "*.ps1" | Sort-Object Name | ForEach-Object {
        . $_.FullName
    }
}

$publicFolder = Join-Path $PSScriptRoot "Public"
if (Test-Path $publicFolder) {
    Get-ChildItem $publicFolder -Filter "*.ps1" | Sort-Object Name | ForEach-Object {
        . $_.FullName
    }
}

Export-ModuleMember -Function @(
    'Invoke-JDRuntimeDiagnostics'
)
