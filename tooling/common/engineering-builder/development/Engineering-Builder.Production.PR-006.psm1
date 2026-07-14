<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-006
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Reporting Engine
Purpose             : Generate build reports and manifests.
Timestamp           : 14 July 2026 18:20

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-006.psm1
#>

function New-JDBuildManifestObject {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildManifest]$Manifest
    )

    [pscustomobject]@{
        ModuleName = $Manifest.Target.ModuleName
        Version    = $Manifest.Target.Version
        RevisionCount = $Manifest.Revisions.Count
        Revisions  = $Manifest.Revisions.RevisionId
        GeneratedUtc = [datetime]::UtcNow
    }
}

function Export-JDBuildManifest {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildManifest]$Manifest,
        [Parameter(Mandatory)][string]$OutputFile
    )

    $obj = New-JDBuildManifestObject -Manifest $Manifest
    $obj | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $OutputFile -Encoding UTF8
    Get-Item -LiteralPath $OutputFile
}

function Export-JDBuildReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildResult]$Result,
        [Parameter(Mandatory)][string]$OutputFile
    )

    $lines = @(
        '# JustDefenders Engineering Build Report',
        '',
        ('Generated UTC : {0}' -f ([datetime]::UtcNow)),
        ('Module        : {0}' -f $Result.OutputFile),
        ('Successful    : {0}' -f $Result.Successful),
        '',
        'Messages',
        '--------'
    )

    $lines += $Result.Messages

    Set-Content -LiteralPath $OutputFile -Value $lines -Encoding UTF8
    Get-Item -LiteralPath $OutputFile
}

function Show-JDBuildSummary {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildResult]$Result
    )

    [pscustomobject]@{
        Successful = $Result.Successful
        StartedUtc = $Result.StartedUtc
        CompletedUtc = $Result.CompletedUtc
        MessageCount = $Result.Messages.Count
        OutputFile = $Result.OutputFile
    }
}

Export-ModuleMember -Function `
    New-JDBuildManifestObject,`
    Export-JDBuildManifest,`
    Export-JDBuildReport,`
    Show-JDBuildSummary

#==============================================================================
# END OF PRODUCTION REVISION PR-006
#==============================================================================
