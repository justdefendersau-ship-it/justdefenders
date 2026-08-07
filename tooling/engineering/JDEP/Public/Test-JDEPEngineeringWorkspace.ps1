# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Test-JDEPEngineeringWorkspace.ps1
# Programme : EP-001
# WorkPack  : PR-001
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Test-JDEPEngineeringWorkspace {
    [CmdletBinding()]
    param(
        [string]$WorkspaceRoot = (Get-Location).Path
    )

    if (-not (Test-Path -LiteralPath $WorkspaceRoot -PathType Container)) {
        throw "Workspace does not exist: $WorkspaceRoot"
    }

    $workspaceRoot = (Resolve-Path -LiteralPath $WorkspaceRoot).Path

    $requiredDirectories = @(
        'Constitution'
        'Documentation'
        'Standards'
        'Public'
        'Private'
        'Diagnostics'
        'Analysis'
        'Reporting'
        'Tests'
    )

    $requiredFiles = @(
        'Engineering-Core.psm1'
        'Composition-Audit.psm1'
        'Public\Initialize-JDEPEngineeringWorkspace.ps1'
        'Public\Test-JDEPEngineeringWorkspace.ps1'
    )

    $requiredCommands = @(
        'Initialize-JDEPEngineeringPlatform'
        'Get-JDEPEngineeringPlatform'
        'Get-JDEPCompositionAudit'
        'Test-JDEPCompositionAudit'
        'Initialize-JDEPEngineeringWorkspace'
        'Test-JDEPEngineeringWorkspace'
    )

    $requiredArtefacts = @(
        'Constitution\README.md'
        'Documentation\README.md'
        'Standards\README.md'
        'Diagnostics\README.md'
        'Analysis\README.md'
        'Reporting\README.md'
        'Tests\README.md'
    )

    $directoryResults = foreach ($directory in $requiredDirectories) {
        $path = Join-Path $workspaceRoot $directory

        [pscustomobject]@{
            Name   = $directory
            Path   = $path
            Status = if (Test-Path -LiteralPath $path -PathType Container) { 'PASS' } else { 'FAIL' }
        }
    }

    $fileResults = foreach ($relativePath in ($requiredFiles + $requiredArtefacts)) {
        $path = Join-Path $workspaceRoot $relativePath

        [pscustomobject]@{
            Path   = $relativePath
            Status = if (Test-Path -LiteralPath $path -PathType Leaf) { 'PASS' } else { 'FAIL' }
        }
    }

    $loadedCommands = Get-Command -CommandType Function,Cmdlet -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty Name

    $commandResults = foreach ($command in $requiredCommands) {
        [pscustomobject]@{
            Name   = $command
            Status = if ($loadedCommands -contains $command) { 'PASS' } else { 'FAIL' }
        }
    }

    $healthy =
        (($directoryResults | Where-Object Status -eq 'FAIL').Count -eq 0) -and
        (($fileResults      | Where-Object Status -eq 'FAIL').Count -eq 0) -and
        (($commandResults   | Where-Object Status -eq 'FAIL').Count -eq 0)

    [pscustomobject]@{
        WorkspaceRoot = $workspaceRoot
        Healthy       = $healthy

        Directories = $directoryResults

        Files = [pscustomobject]@{
            Production = $fileResults | Where-Object {
                $requiredFiles -contains $_.Path
            }

            EngineeringArtefacts = $fileResults | Where-Object {
                $requiredArtefacts -contains $_.Path
            }

            PublicCommands = $commandResults
        }

        Summary = [pscustomobject]@{
            DirectoryPass = ($directoryResults | Where-Object Status -eq 'PASS').Count
            DirectoryFail = ($directoryResults | Where-Object Status -eq 'FAIL').Count

            FilePass = ($fileResults | Where-Object Status -eq 'PASS').Count
            FileFail = ($fileResults | Where-Object Status -eq 'FAIL').Count

            CommandPass = ($commandResults | Where-Object Status -eq 'PASS').Count
            CommandFail = ($commandResults | Where-Object Status -eq 'FAIL').Count
        }
    }
}

Export-ModuleMember -Function Test-JDEPEngineeringWorkspace