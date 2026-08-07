# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Engineering-Validation-Runtime.psm1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-008
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

$moduleRoot = Split-Path -Parent $PSCommandPath

$coreModule = Join-Path $moduleRoot 'Engineering-Core.psm1'

if (-not (Test-Path -LiteralPath $coreModule -PathType Leaf)) {
    throw "Required module not found: $coreModule"
}

Import-Module -Name $coreModule -Force -ErrorAction Stop

$privateRoot = Join-Path $moduleRoot 'Private'

if (Test-Path -LiteralPath $privateRoot -PathType Container) {

    Get-ChildItem -LiteralPath $privateRoot -Filter *.psm1 -File |
        Sort-Object Name |
        ForEach-Object {
            Import-Module -Name $_.FullName -Force -ErrorAction Stop
        }

    Get-ChildItem -LiteralPath $privateRoot -Filter *.ps1 -File |
        Sort-Object Name |
        ForEach-Object {
            . $_.FullName
        }
}

$publicRoot = Join-Path $moduleRoot 'Public'

if (-not (Test-Path -LiteralPath $publicRoot -PathType Container)) {
    throw "Required directory not found: $publicRoot"
}

Get-ChildItem -LiteralPath $publicRoot -Filter *.psm1 -File |
    Sort-Object Name |
    ForEach-Object {
        Import-Module -Name $_.FullName -Force -ErrorAction Stop
    }

Get-ChildItem -LiteralPath $publicRoot -Filter *.ps1 -File |
    Sort-Object Name |
    ForEach-Object {
        . $_.FullName
    }

$requiredCommands = @(
    'Invoke-JDEPEngineeringValidation'
    'Invoke-JDEPEngineeringValidationRule'
    'Invoke-JDEPEngineeringValidationResult'
    'Update-JDEPEngineeringValidationReport'
    'Update-JDEPEngineeringValidationDashboard'
    'Update-JDEPEngineeringValidationHistory'
    'Update-JDEPEngineeringValidationSummary'
)

foreach ($command in $requiredCommands) {

    if (-not (Get-Command -Name $command -ErrorAction SilentlyContinue)) {
        throw "Required Validation command is unavailable: $command"
    }
}

Export-ModuleMember -Function $requiredCommands