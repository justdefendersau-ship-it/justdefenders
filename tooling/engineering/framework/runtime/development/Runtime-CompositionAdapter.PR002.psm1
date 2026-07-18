<#
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

function New-JDPlatformComposition {
    [CmdletBinding()]
    param([Parameter(Mandatory)][object[]]$Components)

    $manifest = New-JDRuntimeManifest -Name 'Platform'
    foreach($component in $Components){ $manifest.AddComponent($component) }

    $validator = New-JDRuntimeValidator
    $result = $validator.ValidateManifest($manifest)
    if(-not $result.Successful){ throw "Platform composition validation failed." }

    $publisher = New-JDRuntimePublisher
    $publisher.Publish($manifest,$result)
}

function Initialize-JDPlatformComposition {
    [CmdletBinding()]
    param()

    $components=@(
        (New-JDRuntimeComponent -Name 'Platform-Bootstrap' -ContractName 'Platform'),
        (New-JDRuntimeComponent -Name 'Platform-Lifecycle' -ContractName 'Platform'),
        (New-JDRuntimeComponent -Name 'Platform-Diagnostics' -ContractName 'Platform')
    )

    foreach($c in $components){ $c.Load() }

    New-JDPlatformComposition -Components $components
}

Export-ModuleMember -Function New-JDPlatformComposition,Initialize-JDPlatformComposition
