# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/New-JDEPEngineeringUnit.ps1
# Programme : EP-001
# WorkPack  : PR-001
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function New-JDEPEngineeringUnit {
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

    $relativeDeliverable = $Deliverable.TrimStart('\','/')

    $outputPath = Join-Path $workspaceRoot $relativeDeliverable

    $parentDirectory = Split-Path -Parent $outputPath

    if (-not (Test-Path -LiteralPath $parentDirectory -PathType Container)) {
        $null = New-Item -ItemType Directory -Path $parentDirectory -Force
    }

    $created = $false

    if (-not (Test-Path -LiteralPath $outputPath -PathType Leaf)) {

        $header = @"
# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : $relativeDeliverable
# Programme : $Programme
# WorkPack  : $WorkPackage
# Unit      : $EngineeringUnit
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

"@

        [System.IO.File]::WriteAllText(
            $outputPath,
            $header,
            [System.Text.UTF8Encoding]::new($false)
        )

        $created = $true
    }

    [pscustomobject]@{
        Programme       = $Programme
        WorkPackage     = $WorkPackage
        EngineeringUnit = $EngineeringUnit
        Deliverable     = $relativeDeliverable
        OutputPath      = $outputPath
        Created         = $created
        Success         = $true
    }
}

Export-ModuleMember -Function New-JDEPEngineeringUnit