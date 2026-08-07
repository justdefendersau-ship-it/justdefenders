# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringValidationHistory.ps1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringValidationHistory {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$ValidationResult,

        [string]$WorkspaceRoot = (Get-Location).Path
    )

    if (-not (Test-Path -LiteralPath $WorkspaceRoot -PathType Container)) {
        throw "Workspace does not exist: $WorkspaceRoot"
    }

    $workspaceRoot = (Resolve-Path -LiteralPath $WorkspaceRoot).Path

    $documentationPath = Join-Path $workspaceRoot 'Documentation'

    if (-not (Test-Path -LiteralPath $documentationPath -PathType Container)) {
        throw "Required directory not found: $documentationPath"
    }

    $validationHistoryPath = Join-Path $documentationPath 'Engineering-Validation-History.md'

    $orderedResults = $ValidationResult |
        Sort-Object `
            @{ Expression = { [datetime]$_.ValidatedAt } },
            @{ Expression = { [string]$_.ValidationIdentifier } },
            @{ Expression = { [string]$_.RuleIdentifier } }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Validation History')
    $lines.Add('')
    $lines.Add('This document is generated exclusively from Engineering Validation Result evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('| Validation Identifier | Rule Identifier | Validation Category | Validation Target | Validation Result | Validation Summary | Validated At |')
    $lines.Add('|-----------------------|-----------------|---------------------|-------------------|-------------------|--------------------|--------------|')

    $validationCount = 0

    foreach ($result in $orderedResults) {

        $category = ([string]$result.ValidationCategory).Replace('|', '\|')
        $target   = ([string]$result.ValidationTarget).Replace('|', '\|')
        $summary  = ([string]$result.ValidationSummary).Replace('|', '\|')

        $validatedAt = ([datetime]$result.ValidatedAt).ToString('yyyy-MM-dd HH:mm:ss')

        $lines.Add(
            "| $($result.ValidationIdentifier) | $($result.RuleIdentifier) | $category | $target | $($result.ValidationResult) | $summary | $validatedAt |"
        )

        $validationCount++
    }

    [System.IO.File]::WriteAllLines(
        $validationHistoryPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ValidationHistoryPath = $validationHistoryPath
        ValidationCount       = $validationCount
        GeneratedAt           = Get-Date
        Success               = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringValidationHistory