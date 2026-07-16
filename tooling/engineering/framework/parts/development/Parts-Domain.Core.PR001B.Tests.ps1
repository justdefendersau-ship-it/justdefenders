Import-Module .\Parts-Domain.Core.psm1 -Force

$p=New-JDPart -CanonicalPartNumber "NRC9448" -Description "Fuel Filter"
$pn=New-JDPartNumber -Number "NRC9448"

$p.AddPartNumber($pn)

$p.Validate()
$pn.Validate()

$p
$p.PartNumbers
