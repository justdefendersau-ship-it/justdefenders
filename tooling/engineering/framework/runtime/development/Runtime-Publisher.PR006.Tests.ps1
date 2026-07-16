Import-Module .\Runtime-Component.PR002.psm1 -Force
Import-Module .\Runtime-Manifest.PR003.psm1 -Force
Import-Module .\Runtime-Validator.PR005.psm1 -Force
Import-Module .\Runtime-Publisher.PR006.psm1 -Force

$c=New-JDRuntimeComponent -Name "Platform Runtime" -ContractName "Platform"
$c.Load()

$m=New-JDRuntimeManifest -Name "Platform"
$m.AddComponent($c)

$v=New-JDRuntimeValidator
$result=$v.ValidateManifest($m)

$p=New-JDRuntimePublisher
$pub=$p.Publish($m,$result)

$pub
