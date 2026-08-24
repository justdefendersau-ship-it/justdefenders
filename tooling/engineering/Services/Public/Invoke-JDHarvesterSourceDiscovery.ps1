<#
==============================================================================
JustDefenders Â©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Invoke-JDHarvesterSourceDiscovery.ps1

Timestamp
16 August 2026 12:03 Sydney

Work Package
PR-019A

Component
Harvester Runtime

Purpose
Provides the controlled PR-019A discovery-only invocation boundary for the
authorised MS-006 Harvester source set.

Responsibilities
    â€¢ Operate through the established Harvester Runtime public surface.
    â€¢ Read the already-registered and already-configured MS-006 source object.
    â€¢ Restrict execution to jlrclassic.
    â€¢ Reuse the existing MS-006 source engine.
    â€¢ Invoke discoverSources only.
    â€¢ Return the discovery result to the caller.
    â€¢ Preserve the PR-019A / PR-019B separation.

Restrictions
    â€¢ No source registration.
    â€¢ No source configuration.
    â€¢ No invocation of Invoke-JDHarvesterCycle.
    â€¢ No invocation of discoverAndCollect.
    â€¢ No invocation of collectSources.
    â€¢ No harvesting.
    â€¢ No queue insertion.
    â€¢ No persistence.
    â€¢ No source-execution statistics update.
    â€¢ No new source authority.
    â€¢ No caller-supplied source definitions.
    â€¢ No automatic execution during module import.

Notes
    â€¢ PR-019A discovery is externally active and may perform HTTP retrieval
      against the configured source endpoint.
    â€¢ Discovery results remain in memory and are returned to the caller.
    â€¢ The existing MS-006 source engine remains the owner of discovery logic.
    â€¢ The existing Harvester source registry remains the owner of registered
      source state.
    â€¢ The existing PR-019B combined discovery/collection path is unchanged.
==============================================================================#>

Set-StrictMode -Version Latest

# ============================================================================
# INVOKE PR-019A DISCOVERY-ONLY OPERATION
# ============================================================================

function Invoke-JDHarvesterSourceDiscovery
{
    [CmdletBinding()]
    param()

    $authorisedSourceNames = @(
        "repco"
        "burson"
        "lrdirect"
    )

    $sources = @(
        Get-JDHarvesterSources
    )

    if($sources.Count -eq 0)
    {
        throw "PR-019A discovery cannot execute because no registered Harvester sources are available."
    }

    $configuredSources = @(
        $sources |
            Where-Object {
                $authorisedSourceNames -contains (
                    [string]$_.Name
                ).ToLowerInvariant()
            }
    )

    if($configuredSources.Count -ne $authorisedSourceNames.Count)
    {
        $missingSources = @(
            $authorisedSourceNames |
                Where-Object {
                    $name = $_

                    -not (
                        $configuredSources |
                            Where-Object {
                                ([string]$_.Name).ToLowerInvariant() -eq $name
                            }
                    )
                }
        )

        throw (
            "PR-019A discovery cannot execute because the authorised source set is incomplete. Missing: {0}" -f
            ($missingSources -join ", ")
        )
    }

    foreach($source in $configuredSources)
    {
        $url =
            if(
                $source.PSObject.Properties.Match("Url").Count -gt 0
            )
            {
                [string]$source.Url
            }
            else
            {
                ""
            }

        $endpoint =
            if(
                $source.PSObject.Properties.Match("Endpoint").Count -gt 0
            )
            {
                [string]$source.Endpoint
            }
            else
            {
                ""
            }

        if(
            [string]::IsNullOrWhiteSpace($url) -and
            [string]::IsNullOrWhiteSpace($endpoint)
        )
        {
            throw (
                "PR-019A discovery cannot execute because authorised source [{0}] has no configured Url or Endpoint." -f
                $source.Name
            )
        }
    }

    $sourceEnginePath =
        Join-Path `
            (Split-Path `
                -Parent `
                (Split-Path `
                    -Parent `
                    (Split-Path `
                        -Parent `
                        $PSScriptRoot))) `
            "server\platform\harvester-source-engine.js"

    if(-not (Test-Path -LiteralPath $sourceEnginePath))
    {
        throw (
            "MS-006 source engine not found: {0}" -f
            $sourceEnginePath
        )
    }

    $sourcePayload =
        @($configuredSources) |
        ConvertTo-Json `
            -Depth 20 `
            -Compress

    $previousSourcePayload =
        $env:JD_MS006_SOURCE_PAYLOAD

    try
    {
        $env:JD_MS006_SOURCE_PAYLOAD =
            $sourcePayload

        $nodeScript = @'
const engine = require(process.argv[1]);

const sources = JSON.parse(
    process.env.JD_MS006_SOURCE_PAYLOAD
);

const candidates = Array.isArray(sources)
    ? sources.map(source => {
        const candidate = {
            ...source
        };

        if (!candidate.url && candidate.Url) {
            candidate.url = candidate.Url;
        }

        if (!candidate.endpoint && candidate.Endpoint) {
            candidate.endpoint = candidate.Endpoint;
        }

        return candidate;
    })
    : [];

(async () => {
    const runtime =
        typeof engine.createEngine === "function"
            ? engine.createEngine()
            : engine;

    if (
        !runtime ||
        typeof runtime.discoverSources !== "function"
    ) {
        throw new Error(
            "MS-006 source engine does not expose discoverSources."
        );
    }

    const result =
        await runtime.discoverSources(
            candidates
        );

    process.stdout.write(
        JSON.stringify(result)
    );
})().catch(error => {
    process.stderr.write(
        error && error.stack
            ? error.stack
            : String(error)
    );

    process.exit(1);
});
'@

        $engineOutput =
            & node `
                -e $nodeScript `
                $sourceEnginePath 2>&1

        if($LASTEXITCODE -ne 0)
        {
            throw (
                "PR-019A discovery failed: {0}" -f
                (($engineOutput | Out-String).Trim())
            )
        }

        $jsonOutput =
            ($engineOutput |
                Where-Object {
                    $_ -is [string] -and
                    -not [string]::IsNullOrWhiteSpace($_)
                } |
                Select-Object -Last 1)

        if([string]::IsNullOrWhiteSpace($jsonOutput))
        {
            throw "PR-019A discovery returned no result."
        }

        try
        {
            $discovery =
                $jsonOutput |
                ConvertFrom-Json `
                    -ErrorAction Stop
        }
        catch
        {
            throw (
                "PR-019A discovery returned invalid JSON: {0}" -f
                $_.Exception.Message
            )
        }

        return $discovery
    }
    finally
    {
        if($null -eq $previousSourcePayload)
        {
            Remove-Item `
                Env:JD_MS006_SOURCE_PAYLOAD `
                -ErrorAction SilentlyContinue
        }
        else
        {
            $env:JD_MS006_SOURCE_PAYLOAD =
                $previousSourcePayload
        }
    }
}

# ============================================================================
# END OF FILE
# ============================================================================