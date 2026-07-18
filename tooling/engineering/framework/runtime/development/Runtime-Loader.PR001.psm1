<#
==============================================================================
JustDefenders©
==============================================================================
Work Package       : WP-JDEF-002
Production Revision: PR-001
Component          : Runtime Loader
Timestamp          : 16 July 2026
Purpose:
    Loads runtime components described by a JDRuntimeManifest.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

class JDRuntimeLoadResult {
    [string]$RuntimeName
    [System.Collections.ArrayList]$LoadedComponents
    [datetime]$LoadedAt

    JDRuntimeLoadResult() {
        $this.LoadedComponents = [System.Collections.ArrayList]::new()
    }
}

class JDRuntimeLoader {

    [JDRuntimeLoadResult] Load([object]$Manifest) {

        if ($null -eq $Manifest) {
            throw "Manifest cannot be null."
        }

        if (-not $Manifest.Validate()) {
            throw "Manifest validation failed."
        }

        $result = [JDRuntimeLoadResult]::new()
        $result.RuntimeName = $Manifest.Name
        $result.LoadedAt = Get-Date

        foreach($component in $Manifest.GetLoadOrder()) {

            if($component.PSObject.Methods.Name -contains 'Load') {
                if($component.State.ToString() -ne 'Loaded') {
                    $component.Load()
                }
            }

            [void]$result.LoadedComponents.Add($component)
        }

        return $result
    }
}

function New-JDRuntimeLoader {
    [CmdletBinding()]
    param()

    return [JDRuntimeLoader]::new()
}

Export-ModuleMember -Function New-JDRuntimeLoader
