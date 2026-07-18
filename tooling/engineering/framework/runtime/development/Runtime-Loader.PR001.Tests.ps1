Import-Module .\Runtime-Component.PR002.psm1 -Force
Import-Module .\Runtime-Manifest.PR003.psm1 -Force
Import-Module .\Runtime-Loader.PR001.psm1 -Force

$manifest = New-JDRuntimeManifest -Name "Platform"

$manifest.AddComponent((New-JDRuntimeComponent -Name "Platform-Bootstrap" -ContractName "Platform"))
$manifest.AddComponent((New-JDRuntimeComponent -Name "Platform-Lifecycle" -ContractName "Platform"))
$manifest.AddComponent((New-JDRuntimeComponent -Name "Platform-Diagnostics" -ContractName "Platform"))

$loader = New-JDRuntimeLoader
$result = $loader.Load($manifest)

$result
$result.LoadedComponents
