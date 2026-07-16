using module .\Parts-Domain.Core.PR001.psm1

$m = New-JDManufacturer -Name "Land Rover" -Country "United Kingdom"
$b = New-JDBrand -Name "Genuine Land Rover" -Manufacturer $m -BrandType OEM
$e = New-JDEvidence -Source "Land Rover EPC" -SourceType OEM -Confidence 1.0

$m.Validate()
$b.Validate()
$e.Validate()

$m
$b
$e
