Import-Module .\Parts-Domain.Core.psm1 -Force

$p=New-JDPart -CanonicalPartNumber "NRC9448" -Description "Fuel Filter"
$c=New-JDCompatibility -Part $p -VehicleModel "Defender 110" -YearFrom 1999 -YearTo 2006 -Engine "Td5"

$p.AddCompatibility($c)

$p.Validate()
$p.GetCompatibilities().Count
$p
