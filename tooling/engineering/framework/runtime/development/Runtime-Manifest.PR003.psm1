<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 10:20
Work Package       : WP-JDEF-001B
Production Revision: PR-003
Component          : Runtime Manifest
Version            : 1.0.0

File:
C:\dev\justdefenders\frontend\tooling\engineering\framework\runtime\development\Runtime-Manifest.PR003.psm1

Purpose:
    Defines the runtime manifest used to compose Runtime Components into a
    declarative runtime definition.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

class JDRuntimeManifest {

    [string]$Name
    [System.Collections.ArrayList]$Components

    JDRuntimeManifest() {
        $this.Components = [System.Collections.ArrayList]::new()
    }

    [void] AddComponent([object]$Component) {
        if ($null -eq $Component) {
            throw "Component cannot be null."
        }
        [void]$this.Components.Add($Component)
    }

    [object] GetComponent([string]$Name) {
        foreach($component in $this.Components) {
            if($component.Name -eq $Name) {
                return $component
            }
        }
        return $null
    }

    [void] RemoveComponent([string]$Name) {
        $component = $this.GetComponent($Name)
        if($null -ne $component) {
            [void]$this.Components.Remove($component)
        }
    }

    [object[]] GetLoadOrder() {
        return @($this.Components)
    }

    [bool] Validate() {
        if([string]::IsNullOrWhiteSpace($this.Name)) {
            return $false
        }

        foreach($component in $this.Components) {
            if($component.PSObject.Methods.Name -contains 'Validate') {
                if(-not $component.Validate()) {
                    return $false
                }
            }
        }

        return $true
    }
}

function New-JDRuntimeManifest {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $manifest = [JDRuntimeManifest]::new()
    $manifest.Name = $Name
    return $manifest
}

Export-ModuleMember -Function New-JDRuntimeManifest
