# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPMilestoneLedger.ps1
# Programme : EP-001
# WorkPack  : PR-001
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPMilestoneLedger {
    [CmdletBinding()]
    param(
        [string]$WorkspaceRoot = (Get-Location).Path
    )

    if (-not (Test-Path -LiteralPath $WorkspaceRoot -PathType Container)) {
        throw "Workspace does not exist: $WorkspaceRoot"
    }

    $workspaceRoot = (Resolve-Path -LiteralPath $WorkspaceRoot).Path

    $gitDirectory = Join-Path $workspaceRoot ".git"

    if (-not (Test-Path -LiteralPath $gitDirectory -PathType Container)) {
        throw "The workspace is not a Git repository: $workspaceRoot"
    }

    $documentationDirectory = Join-Path $workspaceRoot "Documentation"

    if (-not (Test-Path -LiteralPath $documentationDirectory -PathType Container)) {
        throw "Required directory not found: $documentationDirectory"
    }

    $ledgerPath = Join-Path $documentationDirectory "Milestone-Ledger.md"

    Push-Location $workspaceRoot

    try {

        $gitLog = git log `
            --date=iso-strict `
            --pretty=format:"%H|%ad|%s"

        if ($LASTEXITCODE -ne 0) {
            throw "Unable to read Git commit history."
        }

        $engineeringCommits = foreach ($entry in $gitLog) {

            if ([string]::IsNullOrWhiteSpace($entry)) {
                continue
            }

            $parts = $entry -split '\|', 3

            if ($parts.Count -ne 3) {
                continue
            }

            $hash    = $parts[0]
            $date    = $parts[1]
            $subject = $parts[2]

            $programme   = ''
            $workPackage = ''
            $unit         = ''
            $status       = 'Completed'

            if ($subject -match '(EP-\d+)') {
                $programme = $Matches[1]
            }

            if ($subject -match '(PR-\d+[A-Z\-0-9]*)') {
                $workPackage = $Matches[1]
            }

            if ($subject -match '(EU-\d+)') {
                $unit = $Matches[1]
            }

            if ([string]::IsNullOrWhiteSpace($unit)) {
                continue
            }

            [pscustomobject]@{
                Programme   = $programme
                WorkPackage = $workPackage
                EngineeringUnit = $unit
                Commit      = $hash
                CommitDate  = $date
                Subject     = $subject
                Status      = $status
            }
        }

        $productionModules = Get-ChildItem `
            -LiteralPath $workspaceRoot `
            -Recurse `
            -File `
            -Include *.ps1,*.psm1 |
            Sort-Object FullName

        $moduleLookup = @{}

        foreach ($module in $productionModules) {
            $moduleLookup[$module.Name] = $module.FullName.Substring($workspaceRoot.Length).TrimStart('\','/')
        }

        $markdown = [System.Collections.Generic.List[string]]::new()

        $markdown.Add('# JDEP Engineering Milestone Ledger')
        $markdown.Add('')
        $markdown.Add('This document is generated from engineering evidence. Manual edits will be replaced.')
        $markdown.Add('')
        $markdown.Add("| Programme | Work Package | Engineering Unit | Commit | Commit Date | Engineering Deliverable | Status |")
        $markdown.Add("|-----------|--------------|------------------|--------|-------------|-------------------------|--------|")

        foreach ($commit in $engineeringCommits) {

            $deliverable = ''

            switch ($commit.EngineeringUnit) {
                'EU-001' { $deliverable = 'Engineering-Core.psm1' }
                'EU-002' { $deliverable = 'Composition-Audit.psm1' }
                'EU-003' { $deliverable = 'Public/Initialize-JDEPEngineeringWorkspace.ps1' }
                'EU-004' { $deliverable = 'Public/Test-JDEPEngineeringWorkspace.ps1' }
                'EU-005' { $deliverable = 'Public/Update-JDEPMilestoneLedger.ps1' }
                default  { $deliverable = '' }
            }

            $markdown.Add(
                "| $($commit.Programme) | $($commit.WorkPackage) | $($commit.EngineeringUnit) | $($commit.Commit.Substring(0,7)) | $($commit.CommitDate) | $deliverable | $($commit.Status) |"
            )
        }

        [System.IO.File]::WriteAllLines(
            $ledgerPath,
            $markdown,
            [System.Text.UTF8Encoding]::new($false)
        )

        [pscustomobject]@{
            WorkspaceRoot   = $workspaceRoot
            LedgerPath      = $ledgerPath
            EngineeringUnits = $engineeringCommits
            CommitCount     = $engineeringCommits.Count
            GeneratedAt     = (Get-Date)
            Success         = $true
        }
    }
    finally {
        Pop-Location
    }
}

Export-ModuleMember -Function Update-JDEPMilestoneLedger