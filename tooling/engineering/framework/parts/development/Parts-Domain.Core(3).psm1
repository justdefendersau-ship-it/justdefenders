<#
==============================================================================
JustDefenders©
==============================================================================
Timestamp          : 16 July 2026, 14:22
Work Package       : WP-PARTS-001
Production Revision: PR-001B
Component          : Canonical Part Identity
File               : C:\dev\justdefenders\frontend\tooling\engineering\framework\parts\development\Parts-Domain.Core.psm1
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

class JDPartNumber {
    [guid]$PartNumberId=[guid]::NewGuid()
    [string]$Number
    [string]$NumberType='OEM'
    [string]$Status='Active'
    [object]$Evidence

    [bool]Validate(){
        return -not [string]::IsNullOrWhiteSpace($this.Number)
    }

    [string]ToString(){ return "$($this.Number) [$($this.NumberType)]" }
}

class JDPart {
    [guid]$PartId=[guid]::NewGuid()
    [string]$CanonicalPartNumber
    [string]$Description
    [string]$Category
    [string]$SubCategory
    [object]$Manufacturer
    [object]$Brand
    [System.Collections.Generic.List[object]]$PartNumbers
    [System.Collections.Generic.List[object]]$Compatibilities
    [datetime]$CreatedUtc
    [datetime]$UpdatedUtc

    JDPart(){
        $this.PartNumbers=[System.Collections.Generic.List[object]]::new()
        $this.CreatedUtc=[datetime]::UtcNow
        $this.UpdatedUtc=[datetime]::UtcNow
    }

    [void]AddPartNumber([object]$PartNumber){
        $this.PartNumbers.Add($PartNumber)
        $this.UpdatedUtc=[datetime]::UtcNow
    }

    
[void]AddCompatibility([object]$Compatibility){
    $this.Compatibilities.Add($Compatibility)
    $this.UpdatedUtc=[datetime]::UtcNow
}

[object[]]GetCompatibilities(){
    return $this.Compatibilities.ToArray()
}

[object]GetPrimaryPartNumber(){
        if($this.PartNumbers.Count -gt 0){ return $this.PartNumbers[0] }
        return $null
    }

    [bool]Validate(){
        if([string]::IsNullOrWhiteSpace($this.CanonicalPartNumber)){ return $false }
        foreach($c in $this.Compatibilities){
            if($null -ne $c -and ($c.PSObject.Methods.Name -contains 'Validate')){
                if(-not $c.Validate()){ return $false }
            }
        }
        return $true
    }

    [string]ToString(){
        return "$($this.CanonicalPartNumber) - $($this.Description)"
    }
}

function New-JDPart{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$CanonicalPartNumber,
        [Parameter(Mandatory)][string]$Description,
        [string]$Category='General',
        [string]$SubCategory=''
    )
    $p=[JDPart]::new()
    $p.CanonicalPartNumber=$CanonicalPartNumber
    $p.Description=$Description
    $p.Category=$Category
    $p.SubCategory=$SubCategory
    if(-not $p.Validate()){ throw 'Invalid JDPart.'}
    $p
}

function New-JDPartNumber{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Number,
        [string]$NumberType='OEM',
        [object]$Evidence
    )
    $pn=[JDPartNumber]::new()
    $pn.Number=$Number
    $pn.NumberType=$NumberType
    $pn.Evidence=$Evidence
    if(-not $pn.Validate()){ throw 'Invalid JDPartNumber.'}
    $pn
}

Export-ModuleMember -Function New-JDPart,New-JDPartNumber
