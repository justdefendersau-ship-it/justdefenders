<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Register-JDOperationalHostService.ps1

Timestamp
15 August 2026

Work Package
MS-006 / Operational Scheduler — Harvester Work-Execution Contract

Component
Public Host Registration API

Purpose
Registers an Operational Service with the Operational Service Host.

This is the ONLY supported public entry point for service registration.
Consumers must never call the Operational Registry directly.

The Host Runtime validates the request before delegating registration to the
Operational Registry.

Engineering Correction
PR-001 — Registration Return Pipeline / Host Projection

Corrections implemented:

    • Preserve the public registration API.
    • Preserve lifecycle-aware Host validation.
    • Preserve duplicate-registration protection.
    • Preserve delegation to Operational Registry.
    • Preserve Host managed-service statistics.
    • Remove the invalid module-qualified Engineering-Common logger call.
    • Prevent logger / diagnostic output from contaminating the registration
      return value.
    • Resolve the authoritative registration object defensively before Host
      projection.
    • Preserve the Host-facing return contract.
    • Preserve the explicit WorkCommand execution binding when supplied by
      the authorised registration contract.

Dependencies
- Host-ServiceValidation.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Operational-Registry.psm1

==============================================================================
#>

Set-StrictMode -Version Latest

function Register-JDOperationalHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [pscustomobject]
        $Registration
    )

    # ========================================================================
    # VALIDATE HOST
    #
    # Bootstrap occurs before the Operational Host transitions to Running.
    # During bootstrap we only require that the host has been initialised.
    #
    # Once bootstrap has completed, normal runtime registrations require a
    # running Operational Host.
    # ========================================================================

    $hostState = Get-JDHostState

    if ($null -eq $hostState)
    {
        throw "Operational Service Host state could not be resolved."
    }

    if (-not $hostState.Initialised)
    {
        throw "Operational Service Host has not been initialised."
    }

    #
    # Lifecycle-aware validation.
    #
    # During bootstrap the host is intentionally not yet Running, so
    # registrations are permitted while Bootstrapping or Starting.
    #
    # Once bootstrap has completed, all subsequent registrations require
    # a running Operational Host.
    #

    $bootstrapActive =
        ($hostState.Bootstrapping -eq $true) -or
        ($hostState.Starting -eq $true)

    if (-not $bootstrapActive)
    {
        Assert-JDHostRunning
    }

    # ========================================================================
    # VALIDATE REGISTRATION REQUEST
    # ========================================================================

    if (
        -not $Registration.PSObject.Properties["Name"] -or
        [string]::IsNullOrWhiteSpace([string]$Registration.Name)
    )
    {
        throw "Registration.Name is required."
    }

    $registrationName = [string]$Registration.Name

    # ========================================================================
    # PREVENT DUPLICATE REGISTRATIONS
    # ========================================================================

    if (Test-JDHostServiceExists -Name $registrationName)
    {
        throw (
            "Operational Service '{0}' is already registered." -f
            $registrationName
        )
    }

    # ========================================================================
    # CAPTURE AUTHORISED WORK BINDING
    #
    # WorkCommand is optional at the generic Host registration boundary.
    # When supplied by an authorised service registration, it is preserved
    # through the public registration projection.
    #
    # It is deliberately not inferred from:
    #
    #     StartCommand
    #     StartupCommand
    #     ExecuteCommand
    #
    # The downstream registry remains responsible for persistence of the
    # complete registration object.
    # ========================================================================

    $hasWorkCommand =
        $null -ne $Registration.PSObject.Properties["WorkCommand"]

    $workCommand = $null

    if ($hasWorkCommand)
    {
        $workCommand =
            [string]$Registration.PSObject.Properties["WorkCommand"].Value
    }

    # ========================================================================
    # DELEGATE TO OPERATIONAL REGISTRY
    #
    # IMPORTANT:
    #
    # Register-JDOperationalService may emit informational/logging output
    # in addition to the authoritative registration record.
    #
    # Capturing the raw pipeline directly into $service can therefore produce
    # an array containing both the registration object and diagnostic output.
    #
    # Under StrictMode, attempting $service.Name against that array can fail
    # with:
    #
    #   The property 'Name' cannot be found on this object.
    #
    # Therefore the complete output is captured first and the authoritative
    # registration object is explicitly selected.
    # ========================================================================

    $registrationOutput =
        @(
            Register-JDOperationalService `
                -Registration $Registration
        )

    if ($registrationOutput.Count -eq 0)
    {
        throw (
            "Operational Registry returned no result for service '{0}'." -
            $registrationName
        )
    }

    $serviceCandidates =
        @(
            $registrationOutput |
                Where-Object {
                    $null -ne $_ -and
                    $null -ne $_.PSObject.Properties["Name"] -and
                    -not [string]::IsNullOrWhiteSpace(
                        [string]$_.PSObject.Properties["Name"].Value
                    )
                }
        )

    if ($serviceCandidates.Count -eq 0)
    {
        throw (
            "Operational Registry did not return an authoritative registration " +
            "object for service '{0}'." -f
            $registrationName
        )
    }

    #
    # The registration record is the authoritative object. Select the first
    # valid registration object rather than allowing incidental logging output
    # to participate in the Host projection.
    #

    $service = $serviceCandidates[0]

    # ========================================================================
    # VALIDATE AUTHORITATIVE REGISTRATION OBJECT
    # ========================================================================

    if (
        -not $service.PSObject.Properties["Name"] -or
        [string]::IsNullOrWhiteSpace([string]$service.Name)
    )
    {
        throw (
            "Operational Registry returned a registration object without " +
            "a valid Name for service '{0}'." -f
            $registrationName
        )
    }

    if (-not $service.PSObject.Properties["RuntimeStatus"])
    {
        throw (
            "Operational Registry registration object for service '{0}' " +
            "does not contain RuntimeStatus." -f
            $registrationName
        )
    }

    if ($null -eq $service.RuntimeStatus)
    {
        throw (
            "Operational Registry registration object for service '{0}' " +
            "contains a null RuntimeStatus." -f
            $registrationName
        )
    }

    # ========================================================================
    # UPDATE HOST STATISTICS
    # ========================================================================

    Update-JDHostManagedServiceCount | Out-Null

    # ========================================================================
    # ENGINEERING LOG
    #
    # IMPORTANT:
    #
    # Do not module-qualify Engineering-Common here.
    #
    # Operational-ServiceHost imports Engineering-Common during module
    # initialisation and exposes Write-JDEngineeringLog to the Host runtime.
    #
    # The log call is explicitly suppressed so that logger output can never
    # contaminate the public function return pipeline.
    # ========================================================================

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Host registered service [{0}]." -f
            $registrationName
        ) |
        Out-Null

    # ========================================================================
    # RESOLVE RUNTIME STATUS VALUES
    # ========================================================================

    $runtimeStatus = $service.RuntimeStatus

    $state = $null
    $health = $null
    $enabled = $null

    if ($runtimeStatus.PSObject.Properties["State"])
    {
        $state = $runtimeStatus.State
    }

    if ($runtimeStatus.PSObject.Properties["Health"])
    {
        $health = $runtimeStatus.Health
    }

    if ($runtimeStatus.PSObject.Properties["Enabled"])
    {
        $enabled = $runtimeStatus.Enabled
    }

    # ========================================================================
    # RESOLVE REGISTRATION TIMESTAMPS
    # ========================================================================

    $registeredAt = $null
    $updatedAt = $null

    if ($service.PSObject.Properties["RegisteredAt"])
    {
        $registeredAt = $service.RegisteredAt
    }

    if ($service.PSObject.Properties["UpdatedAt"])
    {
        $updatedAt = $service.UpdatedAt
    }

    # ========================================================================
    # HOST MANAGED SERVICE COUNT
    # ========================================================================

    $managedServices =
        Get-JDHostRegisteredServiceCount

    # ========================================================================
    # RETURN HOST-FACING REGISTRATION OBJECT
    #
    # This object represents the Host registration contract.
    # It is not the raw Operational Registry record.
    #
    # WorkCommand is included only when it was supplied by the authoritative
    # registration request. It is never inferred from lifecycle metadata.
    # ========================================================================

    $result = [ordered]@{

        Name =
            [string]$service.Name

        State =
            $state

        Health =
            $health

        Enabled =
            $enabled

        RegisteredAt =
            $registeredAt

        UpdatedAt =
            $updatedAt

        ManagedServices =
            $managedServices

        Timestamp =
            Get-Date
    }

    if ($hasWorkCommand)
    {
        $result["WorkCommand"] =
            $workCommand
    }

    [PSCustomObject]$result
}

# ============================================================================
# END OF FILE
# ============================================================================