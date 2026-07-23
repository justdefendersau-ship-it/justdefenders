<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Public\Invoke-JDRuntimeDiagnostics.ps1

Work Package
    PR-006D.1

Purpose
    Public entry point for the Engineering Runtime Diagnostics subsystem.

==============================================================================
#>

function Invoke-JDRuntimeDiagnostics {

    [CmdletBinding()]
    param(
        [switch]$PassThru
    )

    Write-Host ''
    Write-Host '========================================================='
    Write-Host ' JustDefenders Engineering Runtime Diagnostics'
    Write-Host '========================================================='
    Write-Host ''

    $report = Write-RuntimeReport

    Write-Host ('Modules              : {0}' -f $report.ModuleTopology.Count)
    Write-Host ('Commands             : {0}' -f $report.CommandOwnership.Count)
    Write-Host ('Host State Objects   : {0}' -f $report.HostStateOwnership.Count)
    Write-Host ('Registered Services  : {0}' -f $report.ServiceRegistration.Count)
    Write-Host ('Duplicate Findings   : {0}' -f $report.DuplicateAnalysis.Count)
    Write-Host ''
    Write-Host ('Engineering Verdict  : {0}' -f $report.Verdict)

    if ($report.Summary.Count -gt 0) {
        Write-Host ''
        Write-Host 'Summary'
        Write-Host '-------'

        foreach ($line in $report.Summary) {
            Write-Host (" - {0}" -f $line)
        }
    }

    Write-Host ''

    if ($PassThru) {
        return $report
    }
}
