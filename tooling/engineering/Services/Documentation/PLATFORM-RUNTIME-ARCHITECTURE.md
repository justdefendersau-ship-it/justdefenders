\# Platform Runtime Architecture



Platform-Runtime.psm1 composes the runtime from four layers.



Engineering Common

&#x20;   ↓

Operational Service Host

&#x20;   ↓

Harvester Runtime

&#x20;   ↓

Platform Runtime



Platform Runtime then loads:



Private

&#x20;   Platform-Bootstrap

&#x20;   Platform-Lifecycle

&#x20;   Platform-Diagnostics



Public

&#x20;   Initialize-JDPlatform

&#x20;   Start-JDPlatform

&#x20;   Stop-JDPlatform

&#x20;   Restart-JDPlatform

&#x20;   Get-JDPlatformStatus

&#x20;   Get-JDPlatformMetadata

&#x20;   Platform-Control



\## Important Engineering Rule



The Platform Runtime is manifest driven.



Adding a Public Platform API requires:



1\. Add the script.

2\. Add the script to PlatformManifest.Public.

3\. Export the function using Export-ModuleMember.



Failure to complete all three steps results in runtime validation failure.

