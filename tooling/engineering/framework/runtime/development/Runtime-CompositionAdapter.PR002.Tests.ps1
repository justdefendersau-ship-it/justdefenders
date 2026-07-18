Import-Module .\Runtime-Component.PR002.psm1 -Force
Import-Module .\Runtime-Manifest.PR003.psm1 -Force
Import-Module .\Runtime-Validator.PR005.psm1 -Force
Import-Module .\Runtime-Publisher.PR006.psm1 -Force
Import-Module .\Runtime-CompositionAdapter.PR002.psm1 -Force

$publication = Initialize-JDPlatformComposition
$publication
$publication.Manifest
$publication.Manifest.Components
