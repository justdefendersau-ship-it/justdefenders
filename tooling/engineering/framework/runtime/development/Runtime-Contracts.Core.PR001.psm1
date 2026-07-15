<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 07:50
Work Package       : WP-JDEF-001B
Production Revision: PR-001
Component          : Runtime Contracts Core
Version            : 1.0.0

File:
C:\dev\justdefenders\frontend\tooling\engineering\framework\runtime\development\Runtime-Contracts.Core.PR001.psm1

Purpose:
    Defines the core runtime contract types for the JustDefenders Engineering
    Framework (JDEF). This module is intentionally platform-agnostic and
    contains no runtime composition logic.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

enum JDRuntimeHealth {
    Unknown = 0
    Healthy = 1
    Warning = 2
    Failed  = 3
}

class JDRuntimeDependency {

    [string]$Name
    [string]$MinimumVersion
    [bool]$Required = $true

    JDRuntimeDependency() {}

    JDRuntimeDependency(
        [string]$Name,
        [string]$MinimumVersion,
        [bool]$Required
    ){
        $this.Name = $Name
        $this.MinimumVersion = $MinimumVersion
        $this.Required = $Required
    }

    [bool] Validate() {
        return -not [string]::IsNullOrWhiteSpace($this.Name)
    }

    [string] ToString() {
        return "{0} >= {1}" -f $this.Name,$this.MinimumVersion
    }
}

class JDRuntimeContract {

    [string]$Name
    [string]$Revision
    [string]$Version = "1.0.0"

    [System.Collections.Generic.List[string]]$Provides
    [System.Collections.Generic.List[JDRuntimeDependency]]$Requires

    [JDRuntimeHealth]$Health = [JDRuntimeHealth]::Unknown

    JDRuntimeContract() {
        $this.Provides = [System.Collections.Generic.List[string]]::new()
        $this.Requires = [System.Collections.Generic.List[JDRuntimeDependency]]::new()
    }

    [void] AddProvidedCommand([string]$CommandName) {
        if(-not [string]::IsNullOrWhiteSpace($CommandName)){
            $this.Provides.Add($CommandName)
        }
    }

    [void] AddDependency([JDRuntimeDependency]$Dependency) {
        if($null -ne $Dependency){
            $this.Requires.Add($Dependency)
        }
    }

    [bool] Validate() {

        if([string]::IsNullOrWhiteSpace($this.Name)){
            return $false
        }

        foreach($dependency in $this.Requires){
            if(-not $dependency.Validate()){
                return $false
            }
        }

        return $true
    }
}

function New-JDRuntimeContract {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [string]$Revision = "PR-001"
    )

    $contract = [JDRuntimeContract]::new()
    $contract.Name = $Name
    $contract.Revision = $Revision
    return $contract
}

Export-ModuleMember -Function New-JDRuntimeContract

#==============================================================================
# END OF WP-JDEF-001B PR-001
#==============================================================================
