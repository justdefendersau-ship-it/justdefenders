# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Initialize-JDEPEngineeringWorkspace.ps1
# Programme : EP-001
# WorkPack  : PR-001
# Unit      : EU-003 (Revised)
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Initialize-JDEPEngineeringWorkspace {
    [CmdletBinding()]
    param(
        [string]$WorkspaceRoot = (Get-Location).Path
    )

    if (-not (Test-Path -LiteralPath $WorkspaceRoot -PathType Container)) {
        throw "JDEP workspace does not exist: $WorkspaceRoot"
    }

    $workspaceRoot = (Resolve-Path -LiteralPath $WorkspaceRoot).Path

    $created  = [System.Collections.Generic.List[object]]::new()
    $existing = [System.Collections.Generic.List[object]]::new()
    $failed   = [System.Collections.Generic.List[object]]::new()

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

    foreach ($directory in $requiredDirectories) {

        $path = Join-Path $workspaceRoot $directory

        try {
            if (Test-Path -LiteralPath $path -PathType Container) {
                $existing.Add([pscustomobject]@{
                    Type = 'Directory'
                    Path = $path
                })
            }
            else {
                $null = New-Item -ItemType Directory -Path $path -Force

                $created.Add([pscustomobject]@{
                    Type = 'Directory'
                    Path = $path
                })
            }
        }
        catch {
            $failed.Add([pscustomobject]@{
                Type  = 'Directory'
                Path  = $path
                Error = $_.Exception.Message
            })
        }
    }

    $requiredFiles = @(
        @{
            RelativePath = 'Constitution/README.md'
            Content = @'
# Constitution

This directory contains the JDEP engineering constitution.
'@
        },
        @{
            RelativePath = 'Documentation/README.md'
            Content = @'
# Documentation

This directory contains JDEP engineering documentation.
'@
        },
        @{
            RelativePath = 'Standards/README.md'
            Content = @'
# Standards

This directory contains JDEP engineering standards.
'@
        },
        @{
            RelativePath = 'Diagnostics/README.md'
            Content = @'
# Diagnostics

This directory contains engineering diagnostic artefacts.
'@
        },
        @{
            RelativePath = 'Analysis/README.md'
            Content = @'
# Analysis

This directory contains engineering analysis artefacts.
'@
        },
        @{
            RelativePath = 'Reporting/README.md'
            Content = @'
# Reporting

This directory contains engineering reports.
'@
        },
        @{
            RelativePath = 'Tests/README.md'
            Content = @'
# Tests

This directory contains engineering tests.
'@
        }
    )

    foreach ($file in $requiredFiles) {

        $path = Join-Path $workspaceRoot $file.RelativePath

        try {
            if (Test-Path -LiteralPath $path -PathType Leaf) {

                $existing.Add([pscustomobject]@{
                    Type = 'File'
                    Path = $path
                })
            }
            else {

                $parent = Split-Path -Parent $path

                if (-not (Test-Path -LiteralPath $parent -PathType Container)) {
                    $null = New-Item -ItemType Directory -Path $parent -Force
                }

                [System.IO.File]::WriteAllText(
                    $path,
                    $file.Content.TrimStart(),
                    [System.Text.UTF8Encoding]::new($false)
                )

                $created.Add([pscustomobject]@{
                    Type = 'File'
                    Path = $path
                })
            }
        }
        catch {
            $failed.Add([pscustomobject]@{
                Type  = 'File'
                Path  = $path
                Error = $_.Exception.Message
            })
        }
    }

    [pscustomobject]@{
        Workspace = $workspaceRoot
        Healthy   = ($failed.Count -eq 0)

        Created  = $created
        Existing = $existing
        Failed   = $failed

        Summary = [pscustomobject]@{
            DirectoriesRequired = $requiredDirectories.Count
            FilesRequired       = $requiredFiles.Count
            Created             = $created.Count
            Existing            = $existing.Count
            Failed              = $failed.Count
        }
    }
}

Export-ModuleMember -Function Initialize-JDEPEngineeringWorkspace