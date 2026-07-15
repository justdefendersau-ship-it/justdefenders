Import-Module .\Runtime-Component.PR002.psm1 -Force
Get-Command -Module Runtime-Component
$c=New-JDRuntimeComponent -Name "Platform Runtime" -ContractName "Platform"
$c.Validate()
$c.Load()
$c
