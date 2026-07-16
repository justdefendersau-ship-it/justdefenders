<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 10:50
Work Package       : WP-JDEF-001B
Production Revision: PR-005
Component          : Runtime Validator
Version            : 1.0.0

File:
C:\dev\justdefenders\frontend\tooling\engineering\framework\runtime\development\Runtime-Validator.PR005.psm1
==============================================================================#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

class JDRuntimeValidationResult {
    [bool]$Successful = $true
    [System.Collections.ArrayList]$Errors
    [System.Collections.ArrayList]$Warnings

    JDRuntimeValidationResult() {
        $this.Errors=[System.Collections.ArrayList]::new()
        $this.Warnings=[System.Collections.ArrayList]::new()
    }

    [void]AddError([string]$Message){
        [void]$this.Errors.Add($Message)
        $this.Successful=$false
    }

    [void]AddWarning([string]$Message){
        [void]$this.Warnings.Add($Message)
    }
}

class JDRuntimeValidator {

    [JDRuntimeValidationResult] ValidateComponent([object]$Component){
        $r=[JDRuntimeValidationResult]::new()
        if($null -eq $Component){
            $r.AddError("Component is null.")
            return $r
        }
        if($Component.PSObject.Methods.Name -contains 'Validate'){
            if(-not $Component.Validate()){
                $r.AddError("Component validation failed.")
            }
        } else {
            $r.AddWarning("Component exposes no Validate() method.")
        }
        return $r
    }

    [JDRuntimeValidationResult] ValidateManifest([object]$Manifest){
        $r=[JDRuntimeValidationResult]::new()
        if($null -eq $Manifest){
            $r.AddError("Manifest is null.")
            return $r
        }
        if(-not $Manifest.Validate()){
            $r.AddError("Manifest validation failed.")
        }
        return $r
    }

    [JDRuntimeValidationResult] ValidateRegistry([object]$Registry){
        $r=[JDRuntimeValidationResult]::new()
        if($null -eq $Registry){
            $r.AddError("Registry is null.")
            return $r
        }
        if(-not $Registry.Validate()){
            $r.AddError("Registry validation failed.")
        }
        return $r
    }
}

function New-JDRuntimeValidator {
    [CmdletBinding()]
    param()
    [JDRuntimeValidator]::new()
}

Export-ModuleMember -Function New-JDRuntimeValidator
