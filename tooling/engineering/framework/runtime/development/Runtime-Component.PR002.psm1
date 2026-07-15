<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 10:30
Work Package       : WP-JDEF-001B
Production Revision: PR-002 (v2)
Component          : Runtime Component
Version            : 1.0.0

File:
C:\dev\justdefenders\frontend\tooling\engineering\framework\runtime\development\Runtime-Component.PR002.psm1
==============================================================================#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

enum JDRuntimeState {
    Discovered = 0
    Loaded     = 1
    Published  = 2
    Failed     = 3
}

class JDRuntimeComponent {
    [string]$Name
    [string]$DisplayName
    [string]$Description
    [string]$Revision
    [string]$Version='1.0.0'
    [string]$ContractName
    [JDRuntimeState]$State=[JDRuntimeState]::Discovered
    [hashtable]$Metadata
    [datetime]$LoadedAt

    JDRuntimeComponent() {
        $this.Metadata=@{}
    }

    [void]SetContractName([string]$ContractName){
        if([string]::IsNullOrWhiteSpace($ContractName)){
            throw "ContractName cannot be empty."
        }
        $this.ContractName=$ContractName
    }

    [bool]Validate(){
        if([string]::IsNullOrWhiteSpace($this.Name)){ return $false }
        if([string]::IsNullOrWhiteSpace($this.ContractName)){ return $false }
        return $true
    }

    [void]Load(){
        if(-not $this.Validate()){
            throw "Component validation failed."
        }
        $this.State=[JDRuntimeState]::Loaded
        $this.LoadedAt=Get-Date
    }

    [void]Publish(){
        if($this.State -ne [JDRuntimeState]::Loaded){
            throw "Component must be loaded before publication."
        }
        $this.State=[JDRuntimeState]::Published
    }

    [string]ToString(){
        return "{0} ({1})" -f $this.Name,$this.State
    }
}

function New-JDRuntimeComponent {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name,
        [Parameter(Mandatory)][string]$ContractName
    )

    $c=[JDRuntimeComponent]::new()
    $c.Name=$Name
    $c.DisplayName=$Name
    $c.SetContractName($ContractName)
    return $c
}

Export-ModuleMember -Function New-JDRuntimeComponent
