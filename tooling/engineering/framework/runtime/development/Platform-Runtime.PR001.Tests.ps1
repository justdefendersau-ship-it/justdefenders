Import-Module ..\..\framework\runtime\development\Runtime-Component.PR002.psm1 -Force
Import-Module ..\..\framework\runtime\development\Runtime-Manifest.PR003.psm1 -Force
Import-Module ..\..\framework\runtime\development\Runtime-Validator.PR005.psm1 -Force
Import-Module ..\..\framework\runtime\development\Runtime-Publisher.PR006.psm1 -Force
Import-Module .\Platform-Runtime.PR001.ManifestDriven.psm1 -Force

$publication = Initialize-JDPlatformRuntimeComposition
$publication
