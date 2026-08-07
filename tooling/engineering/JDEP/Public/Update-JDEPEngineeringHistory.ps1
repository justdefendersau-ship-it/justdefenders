# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringHistory.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringHistory {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$EngineeringReview,

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

    $historyPath = Join-Path $documentationPath 'Engineering-History.md'

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering History')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Review evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('| Programme | Work Package | Engineering Unit | Deliverable | Review Result | Summary | Reviewed At |')
    $lines.Add('|-----------|--------------|------------------|-------------|---------------|---------|-------------|')

    foreach ($review in $EngineeringReview) {

        if ($null -eq $review) {
            continue
        }

        $programme       = [string]$review.Programme
        $workPackage     = [string]$review.WorkPackage
        $engineeringUnit = [string]$review.EngineeringUnit
        $deliverable     = [string]$review.Deliverable
        $reviewResult    = [string]$review.ReviewResult
        $summary         = ([string]$review.Summary).Replace('|', '\|')
        $reviewedAt      = [string]$review.ReviewedAt

        $lines.Add(
            "| $programme | $workPackage | $engineeringUnit | $deliverable | $reviewResult | $summary | $reviewedAt |"
        )
    }

    [System.IO.File]::WriteAllLines(
        $historyPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        HistoryPath = $historyPath
        ReviewCount = @($EngineeringReview).Count
        GeneratedAt = Get-Date
        Success     = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringHistory