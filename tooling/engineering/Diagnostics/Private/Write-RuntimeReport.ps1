<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Private\Write-RuntimeReport.ps1

Work Package
    PR-006D.1

Purpose
    Collate all runtime diagnostic information into a single engineering report.

==============================================================================
#>

function Write-RuntimeReport {

    [CmdletBinding()]
    param()

    $report = [PSCustomObject]@{
        Timestamp          = Get-Date
        ModuleTopology     = @(Get-ModuleTopology)
        CommandOwnership   = @(Get-CommandOwnership)
        HostStateOwnership = @(Get-HostStateOwnership)
        ServiceRegistration= @(Get-ServiceRegistration)
        DuplicateAnalysis  = @(Get-DuplicateAnalysis)
        Verdict            = 'PASS'
        Summary            = @()
    }

    if ($report.CommandOwnership.Where({ $_.Status -eq 'Missing' }).Count -gt 0) {
        $report.Verdict = 'WARN'
        $report.Summary += 'One or more expected commands are missing.'
    }

    if ($report.DuplicateAnalysis.Where({ $_.Status -eq 'Duplicate' }).Count -gt 0) {
        $report.Verdict = 'FAIL'
        $report.Summary += 'Duplicate runtime ownership detected.'
    }

    if ($report.Summary.Count -eq 0) {
        $report.Summary += 'Runtime diagnostics completed successfully.'
    }

    return $report
}
