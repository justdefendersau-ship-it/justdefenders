<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 11:30
Work Package       : WP-PLATFORM-003
Production Revision: PR-001
Component          : Manifest-driven Platform Runtime

File:
C:\dev\justdefenders\frontend\tooling\engineering\Services\Platform-Runtime.psm1

Purpose:
    Demonstrates JDEF manifest-driven composition. This revision replaces
    embedded runtime script collections with a JDRuntimeManifest.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

function New-JDPlatformRuntimeManifest {
    [CmdletBinding()]
    param()

    $manifest = New-JDRuntimeManifest -Name 'Platform'

    $bootstrap = New-JDRuntimeComponent -Name 'Platform-Bootstrap' -ContractName 'Platform'
    $lifecycle = New-JDRuntimeComponent -Name 'Platform-Lifecycle' -ContractName 'Platform'
    $diagnostics = New-JDRuntimeComponent -Name 'Platform-Diagnostics' -ContractName 'Platform'

    $manifest.AddComponent($bootstrap)
    $manifest.AddComponent($lifecycle)
    $manifest.AddComponent($diagnostics)

    return $manifest
}

function Initialize-JDPlatformRuntimeComposition {
    [CmdletBinding()]
    param()

    $manifest = New-JDPlatformRuntimeManifest

    $validator = New-JDRuntimeValidator
    $result = $validator.ValidateManifest($manifest)

    if(-not $result.Successful){
        throw "Platform runtime manifest validation failed."
    }

    $publisher = New-JDRuntimePublisher
    return $publisher.Publish($manifest,$result)
}

Export-ModuleMember -Function `
    New-JDPlatformRuntimeManifest,`
    Initialize-JDPlatformRuntimeComposition
