# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Complete-JDEPEngineeringUnit.ps1
# Programme : EP-001
# WorkPack  : PR-001
# Unit      : EU-008
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Complete-JDEPEngineeringUnit {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$WorkspaceRoot,

        [Parameter(Mandatory)]
        [ValidatePattern('^EP-\d+$')]
        [string]$Programme,

        [Parameter(Mandatory)]
        [ValidatePattern('^PR-[A-Za-z0-9\-]+$')]
        [string]$WorkPackage,

        [Parameter(Mandatory)]
        [ValidatePattern('^EU-\d+$')]
        [string]$EngineeringUnit,

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$Deliverable
    )

    if (-not (Test-Path -LiteralPath $WorkspaceRoot -PathType Container)) {
        throw "Workspace does not exist: $WorkspaceRoot"
    }

    $workspaceRoot = (Resolve-Path -LiteralPath $WorkspaceRoot).Path

    $runtimePath = Join-Path $workspaceRoot 'JDEP-Runtime.psm1'

    if (-not (Test-Path -LiteralPath $runtimePath -PathType Leaf)) {
        throw "Required runtime not found: $runtimePath"
    }

    Import-Module -Name $runtimePath -Force -ErrorAction Stop

    foreach ($requiredCommand in @(
        'Test-JDEPEngineeringWorkspace'
        'Update-JDEPMilestoneLedger'
    )) {
        if (-not (Get-Command -Name $requiredCommand -ErrorAction SilentlyContinue)) {
            throw "Required engineering capability unavailable: $requiredCommand"
        }
    }

    $validation = Test-JDEPEngineeringWorkspace -WorkspaceRoot $workspaceRoot

    if (-not $validation.Healthy) {
        throw "Engineering workspace validation failed."
    }

    $commitMessage = "$Programme $WorkPackage $EngineeringUnit - $Deliverable"

    Push-Location $workspaceRoot

    try {

        & git add --all
        if ($LASTEXITCODE -ne 0) {
            throw "Git staging failed."
        }

        & git commit -m $commitMessage
        if ($LASTEXITCODE -ne 0) {
            throw "Git commit failed."
        }

        $gitCommit = (& git rev-parse HEAD).Trim()

        if ($LASTEXITCODE -ne 0) {
            throw "Unable to determine Git commit."
        }

        $ledger = Update-JDEPMilestoneLedger -WorkspaceRoot $workspaceRoot

        [pscustomobject]@{
            Programme        = $Programme
            WorkPackage      = $WorkPackage
            EngineeringUnit  = $EngineeringUnit
            Deliverable      = $Deliverable
            WorkspaceHealthy = $validation.Healthy
            GitCommit        = $gitCommit
            MilestoneLedger  = $ledger.LedgerPath
            CompletedAt      = Get-Date
            Success          = $true
        }
    }
    finally {
        Pop-Location
    }
}

Export-ModuleMember -Function Complete-JDEPEngineeringUnit