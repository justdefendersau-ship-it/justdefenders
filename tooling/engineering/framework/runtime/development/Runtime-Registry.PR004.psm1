<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 10:35
Work Package       : WP-JDEF-001B
Production Revision: PR-004
Component          : Runtime Registry
Version            : 1.0.0

File:
C:\dev\justdefenders\frontend\tooling\engineering\framework\runtime\development\Runtime-Registry.PR004.psm1

Purpose:
    Provides the runtime registry responsible for tracking runtime components.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

class JDRuntimeRegistry {

    [hashtable]$Components

    JDRuntimeRegistry() {
        $this.Components = @{}
    }

    [void] RegisterComponent([object]$Component) {
        if($null -eq $Component){ throw "Component cannot be null." }
        if(-not $Component.PSObject.Properties.Match('Name')) {
            throw "Component must expose a Name property."
        }
        if($this.Components.ContainsKey($Component.Name)){
            throw "Component '$($Component.Name)' is already registered."
        }
        $this.Components[$Component.Name] = $Component
    }

    [void] UnregisterComponent([string]$Name) {
        [void]$this.Components.Remove($Name)
    }

    [object] GetComponent([string]$Name) {
        return $this.Components[$Name]
    }

    [object[]] GetComponents() {
        return @($this.Components.Values)
    }

    [bool] ContainsComponent([string]$Name) {
        return $this.Components.ContainsKey($Name)
    }

    [bool] Validate() {
        foreach($c in $this.Components.Values){
            if($c.PSObject.Methods.Name -contains 'Validate'){
                if(-not $c.Validate()){ return $false }
            }
        }
        return $true
    }
}

function New-JDRuntimeRegistry {
    [CmdletBinding()]
    param()
    return [JDRuntimeRegistry]::new()
}

Export-ModuleMember -Function New-JDRuntimeRegistry
