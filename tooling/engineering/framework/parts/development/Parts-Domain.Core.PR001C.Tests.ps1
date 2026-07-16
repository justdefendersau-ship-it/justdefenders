Import-Module .\Parts-Domain.Core.psm1 -Force

$p=New-JDPart -CanonicalPartNumber "NRC9448" -Description "Fuel Filter"
$pn=New-JDPartNumber -Number "NRC9448"
$p.AddPartNumber($pn)

$c=New-JDCompatibility `
    -Part $p `
    -VehicleModel "Defender 110" `
    -YearFrom 1999 `
    -YearTo 2006 `
    -Engine "Td5" `
    -Gearbox "R380" `
    -Market "AU"

$c.Validate()
$c
