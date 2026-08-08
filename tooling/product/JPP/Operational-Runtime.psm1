# ==================================================================================================

# JustDefenders Product Platform (JPP)

#

# File      : tooling/product/JPP/Operational-Runtime.psm1

# Programme : PP-001

# WorkPack  : WP-008

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
    Get-ChildItem -LiteralPath $privateRoot -Filter '*.psm1' -File |
        Sort-Object -Property Name |
        ForEach-Object {
            Import-Module -Name $_.FullName -Force -ErrorAction Stop
        }

    Get-ChildItem -LiteralPath $privateRoot -Filter '*.ps1' -File |
        Sort-Object -Property Name |
        ForEach-Object {
            . $_.FullName
        }
}

$publicRoot = Join-Path $moduleRoot 'Public'

if (-not (Test-Path -LiteralPath $publicRoot -PathType Container)) {
    throw "Required directory not found: $publicRoot"
}

Get-ChildItem -LiteralPath $publicRoot -Filter '*.psm1' -File |
    Sort-Object -Property Name |
    ForEach-Object {
        Import-Module -Name $_.FullName -Force -ErrorAction Stop
    }

Get-ChildItem -LiteralPath $publicRoot -Filter '*.ps1' -File |
    Sort-Object -Property Name |
    ForEach-Object {
        . $_.FullName
    }

$requiredCommands = @(
    'Invoke-JPPOperationalDomain'
    'Invoke-JPPRuntimeMetadata'
    'Invoke-JPPComponentHealth'
    'Invoke-JPPDependencyHealth'
    'Invoke-JPPRuntimeHealth'
    'Invoke-JPPRuntimeHeartbeat'
    'Invoke-JPPOperationalStatus'
)

foreach ($command in $requiredCommands) {
    $availableCommand = Get-Command -Name $command -ErrorAction SilentlyContinue

    if ($null -eq $availableCommand) {
        throw "Required Operational Runtime command is unavailable: $command"
    }
}

Export-ModuleMember -Function $requiredCommands