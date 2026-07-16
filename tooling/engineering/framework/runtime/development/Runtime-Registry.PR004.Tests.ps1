Import-Module .\Runtime-Component.PR002.psm1 -Force
Import-Module .\Runtime-Registry.PR004.psm1 -Force

$registry = New-JDRuntimeRegistry

$component = New-JDRuntimeComponent `
    -Name "Platform Runtime" `
    -ContractName "Platform"

$component.Load()

$registry.RegisterComponent($component)

$registry.ContainsComponent("Platform Runtime")

$registry.GetComponent("Platform Runtime")

$registry.Validate()

$registry
