Import-Module .\Runtime-Component.PR002.psm1 -Force
Import-Module .\Runtime-Manifest.PR003.psm1 -Force
Import-Module .\Runtime-Registry.PR004.psm1 -Force
Import-Module .\Runtime-Validator.PR005.psm1 -Force

$c=New-JDRuntimeComponent -Name "Platform Runtime" -ContractName "Platform"
$c.Load()

$m=New-JDRuntimeManifest -Name "Platform"
$m.AddComponent($c)

$r=New-JDRuntimeRegistry
$r.RegisterComponent($c)

$v=New-JDRuntimeValidator

$v.ValidateComponent($c)
$v.ValidateManifest($m)
$v.ValidateRegistry($r)
