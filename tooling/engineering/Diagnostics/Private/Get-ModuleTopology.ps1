function Get-ModuleTopology {
    [CmdletBinding()]
    param()
    foreach($module in (Get-Module | Sort-Object Name)){
        $nested=@($module.NestedModules|ForEach-Object{$_.Name})
        [pscustomobject]@{
            Name=$module.Name
            Path=$module.Path
            ModuleType=$module.ModuleType
            Version=$module.Version
            Loaded=$true
            ParentModule=$null
            NestedModuleReferences=$nested
            ExportedFunctions=@($module.ExportedFunctions.Keys)
            ExportedFunctionCount=@($module.ExportedFunctions.Keys).Count
            ExportedCmdletCount=@($module.ExportedCmdlets.Keys).Count
            ExportedAliasCount=@($module.ExportedAliases.Keys).Count
            ExportedVariableCount=@($module.ExportedVariables.Keys).Count
        }
        foreach($child in $module.NestedModules){
            [pscustomobject]@{
                Name=$child.Name
                Path=$child.Path
                ModuleType=$child.ModuleType
                Version=$child.Version
                Loaded=$false
                ParentModule=$module.Name
                NestedModuleReferences=@()
                ExportedFunctions=@()
                ExportedFunctionCount=$null
                ExportedCmdletCount=$null
                ExportedAliasCount=$null
                ExportedVariableCount=$null
            }
        }
    }
}
