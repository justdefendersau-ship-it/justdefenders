Import-Module .\Parts-Domain.Core.psm1 -Force

$m=New-JDManufacturer -Name "Land Rover" -Country "United Kingdom"
$b=New-JDBrand -Name "Genuine Land Rover" -Manufacturer $m
$e=New-JDEvidence -Source "Land Rover EPC"

$p=New-JDPart -CanonicalPartNumber "NRC9448" -Description "Fuel Filter"
$pn=New-JDPartNumber -Number "NRC9448" -Evidence $e
$p.Manufacturer=$m
$p.Brand=$b
$p.AddPartNumber($pn)

$c=New-JDCompatibility -Part $p -VehicleModel "Defender 110" -YearFrom 1999 -YearTo 2006 -Engine "Td5" -Gearbox "R380" -Evidence $e

$p.Validate()
$pn.Validate()
$c.Validate()

$p
$c
