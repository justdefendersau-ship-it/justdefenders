# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Engineering-Core.psm1
# Programme : EP-001
# WorkPack  : PR-001
# Unit       : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

$script:JDEPState = [ordered]@{
    Platform        = 'JDEP'
    Version         = '0.1.0'
    Initialised     = $false
    InitialisedAt   = $null
    Root            = $null
}

function Initialize-JDEPEngineeringPlatform {
    [CmdletBinding()]
    param(
        [string]$Root = (Get-Location).Path
    )

    $resolved = (Resolve-Path -LiteralPath $Root).Path

    $script:JDEPState.Root          = $resolved
    $script:JDEPState.Initialised   = $true
    $script:JDEPState.InitialisedAt = Get-Date

    [pscustomobject]@{
        Platform      = $script:JDEPState.Platform
        Version       = $script:JDEPState.Version
        Status        = 'Ready'
        Root          = $script:JDEPState.Root
        InitialisedAt = $script:JDEPState.InitialisedAt
    }
}

function Get-JDEPEngineeringPlatform {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Platform      = $script:JDEPState.Platform
        Version       = $script:JDEPState.Version
        Initialised   = $script:JDEPState.Initialised
        Root          = $script:JDEPState.Root
        InitialisedAt = $script:JDEPState.InitialisedAt
    }
}

Export-ModuleMember `
    -Function Initialize-JDEPEngineeringPlatform,
              Get-JDEPEngineeringPlatform