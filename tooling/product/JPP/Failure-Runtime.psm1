# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Failure-Runtime.psm1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-008
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

$moduleRoot = Split-Path -Parent $PSCommandPath

$coreModule = Join-Path $moduleRoot 'Product-Core.psm1'

if (Test-Path -LiteralPath $coreModule -PathType Leaf) {
    Import-Module -Name $coreModule -Force -ErrorAction Stop
}

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
    'Invoke-JPPFailureDomain'
    'Invoke-JPPFailureEvent'
    'Invoke-JPPFailurePattern'
    'Invoke-JPPFailureRelationship'
    'Invoke-JPPFailureSearch'
    'Invoke-JPPFailureDashboard'
    'Invoke-JPPFailureIntelligence'
)

foreach ($command in $requiredCommands) {
    if (-not (Get-Command -Name $command -ErrorAction SilentlyContinue)) {
        throw "Required Failure Intelligence Platform command is unavailable: $command"
    }
}

Export-ModuleMember -Function $requiredCommands