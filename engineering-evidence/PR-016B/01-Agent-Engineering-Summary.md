Engineering summary

Files modified



BuiltInServices.psd1

ManagedService-Registration.ps1

ManagedService-Lifecycle.psm1

ManagedService-Runtime.psm1

Functions modified



ManagedService-Registration.ps1: Register-JDManagedService

ManagedService-Lifecycle.psm1: Register-JDManagedService, Start-JDManagedService, Stop-JDManagedService

ManagedService-Runtime.psm1: New-JDManagedServiceRuntime

Summary of each change



Added ExecuteCommand to the managed-service registration contract and ensured it is present on the registration object passed through the host registration path.

Enabled the lifecycle module to resolve and invoke an ExecuteCommand dispatcher for start/stop operations while preserving existing lifecycle transition semantics.

Extended runtime creation to retain metadata so the lifecycle module can inspect registration details at runtime without changing the existing public API shape.

Added ExecuteCommand = 'Invoke-JDManagedServiceExecute' to the built-in service manifest entries so the registered built-in services expose the new dispatch contract.

Verification



Editor diagnostics report no errors for the four modified files.

