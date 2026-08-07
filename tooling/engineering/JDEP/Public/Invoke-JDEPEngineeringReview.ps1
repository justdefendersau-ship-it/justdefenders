# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Invoke-JDEPEngineeringReview.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JDEPEngineeringReview {
    [CmdletBinding()]
    param(
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
        [string]$Deliverable,

        [Parameter(Mandatory)]
        [ValidateSet(
            'PASS',
            'PASS WITH OBSERVATIONS',
            'REVISION REQUIRED',
            'REJECTED',
            'ENGINEERING BLOCKER'
        )]
        [string]$ReviewResult,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$Summary,

        [string[]]$Observations = @()
    )

    $reviewedAt = Get-Date

    [pscustomobject]@{
        Programme       = $Programme
        WorkPackage     = $WorkPackage
        EngineeringUnit = $EngineeringUnit
        Deliverable     = $Deliverable
        ReviewResult    = $ReviewResult
        Summary         = $Summary
        Observations    = @($Observations)
        ReviewedAt      = $reviewedAt
        Success         = $true
    }
}

Export-ModuleMember -Function Invoke-JDEPEngineeringReview