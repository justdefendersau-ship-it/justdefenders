Import-Module .\Runtime-Component.PR002.psm1 -Force
Import-Module .\Runtime-Manifest.PR003.psm1 -Force

$manifest = New-JDRuntimeManifest -Name "Platform"

$component = New-JDRuntimeComponent `
    -Name "Platform Runtime" `
    -ContractName "Platform"

$component.Load()

$manifest.AddComponent($component)

$manifest.Validate()

$manifest.GetLoadOrder()

$manifest
