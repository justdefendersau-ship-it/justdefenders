<#
==================================================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Harvester-Runtime.psm1

Timestamp
15th August 2026 12:05 Sydney

Work Package
PR-019A

Component
Harvester Runtime

Purpose
Bootstrap and controlled runtime integration boundary for the JustDefenders Harvester Runtime.

PR-019A Authority
SOURCE DISCOVERY ONLY

Responsibilities
    • Load Engineering Common.
    • Load all Private Harvester modules.
    • Load all Public Harvester modules except the legacy PR-019A discovery implementation.
    • Establish the deterministic MS-006 source-engine path.
    • Provide the controlled PR-019A discovery-only Node bridge.
    • Preserve the existing Harvester public API.
    • Expose complete Node exceptions and stack traces to the PowerShell caller.

Explicitly NOT performed by PR-019A
    • No collection.
    • No harvesting.
    • No Invoke-JDHarvesterCycle.
    • No discoverAndCollect.
    • No collectSources.
    • No persistence.
    • No federation.
    • No queue insertion.
    • No source-execution statistics update.
    • No automatic discovery during module import.

Architecture
    PowerShell Harvester Runtime
        ->
    controlled PR-019A discovery boundary
        ->
    deterministic MS-006 production engine
        ->
    discoverSources()
        ->
    in-memory discovery result

The existing MS-006 engine remains the owner of discovery logic.

==================================================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# RUNTIME PATHS
# ============================================================================

$servicesRoot =
    $PSScriptRoot

$privateFolder =
    Join-Path `
        $servicesRoot `
        "Private"

$publicFolder =
    Join-Path `
        $servicesRoot `
        "Public"

#
# Engineering Common is physically located beside Harvester-Runtime.psm1.
#
$engineeringCommonPath =
    Join-Path `
        $servicesRoot `
        "Engineering-Common.psm1"

#
# MS-006 is a production server surface, not an engineering Services surface.
#
$sourceEnginePath =
    Join-Path `
        (Split-Path `
            -Parent `
            (Split-Path `
                -Parent `
                (Split-Path `
                    -Parent `
                    $servicesRoot))) `
        "server\platform\harvester-source-engine.js"

# ============================================================================
# VALIDATE REQUIRED PRODUCTION SURFACES
# ============================================================================

if(-not (Test-Path -LiteralPath $engineeringCommonPath))
{
    throw (
        "Harvester Runtime dependency not found: {0}" -f
        $engineeringCommonPath
    )
}

if(-not (Test-Path -LiteralPath $privateFolder))
{
    throw (
        "Harvester Runtime private module directory not found: {0}" -f
        $privateFolder
    )
}

if(-not (Test-Path -LiteralPath $publicFolder))
{
    throw (
        "Harvester Runtime public module directory not found: {0}" -f
        $publicFolder
    )
}

if(-not (Test-Path -LiteralPath $sourceEnginePath))
{
    throw (
        "MS-006 source engine not found: {0}" -f
        $sourceEnginePath
    )
}

# ============================================================================
# IMPORT ENGINEERING COMMON
# ============================================================================

Import-Module `
    $engineeringCommonPath `
    -Force `
    -ErrorAction Stop

# ============================================================================
# LOAD PRIVATE HARVESTER MODULES
# ============================================================================

$privateModules =
    @(
        Get-ChildItem `
            -Path $privateFolder `
            -Filter "Harvester-*.ps1" `
            -File |
        Where-Object {
            $_.Name -notmatch '\.backup\.ps1$' -and
            $_.Name -notmatch '\.empty\.ps1$'
        } |
        Sort-Object Name
    )

foreach($privateModule in $privateModules)
{
    try
    {
        . $privateModule.FullName
    }
    catch
    {
        throw (
            "Failed loading private Harvester module [{0}].`n{1}" -f
            $privateModule.Name,
            ($_.Exception | Out-String)
        )
    }
}

# ============================================================================
# LOAD PUBLIC HARVESTER MODULES
#
# PR-019A NOTE
#
# The existing Invoke-JDHarvesterSourceDiscovery.ps1 contains the obsolete
# node -e bridge which masks the underlying Node exception behind [eval]:29.
#
# It is deliberately NOT dot-sourced here.
#
# The corrected PR-019A discovery boundary is implemented below so that the
# runtime owns the actual integration boundary while the MS-006 engine remains
# the owner of discovery behaviour.
# ============================================================================

Get-ChildItem `
    -Path $publicFolder `
    -Filter "*Harvester*.ps1" `
    -File |
Where-Object {
    $_.Name -ne "Invoke-JDHarvesterSourceDiscovery.ps1"
} |
Sort-Object Name |
ForEach-Object {

    $publicModule =
        $_

    try
    {
        . $publicModule.FullName
    }
    catch
    {
        throw (
            "Failed loading public Harvester module [{0}].`n{1}" -f
            $publicModule.Name,
            ($_.Exception | Out-String)
        )
    }
}

# ============================================================================
# PR-019A — DETERMINISTIC MS-006 SOURCE ENGINE RESOLUTION
# ============================================================================

function Get-JDHarvesterMS006SourceEnginePath
{
    [CmdletBinding()]
    param()

    $resolvedPath =
        (Resolve-Path `
            -LiteralPath $sourceEnginePath `
            -ErrorAction Stop).Path

    if(
        [string]::IsNullOrWhiteSpace(
            $resolvedPath
        )
    )
    {
        throw "PR-019A could not resolve the MS-006 source engine path."
    }

    if(
        -not (
            Test-Path `
                -LiteralPath $resolvedPath `
                -PathType Leaf
        )
    )
    {
        throw (
            "PR-019A resolved MS-006 source engine is not a file: {0}" -f
            $resolvedPath
        )
    }

    return $resolvedPath
}

# ============================================================================
# PR-019A — NODE BRIDGE
#
# IMPORTANT
#
# This is intentionally a .cjs file rather than node -e.
#
# node -e changes the reported JavaScript source location to [eval]:N.
# A real CommonJS file gives Node a deterministic physical filename and allows
# the complete require()/execution stack to be returned.
# ============================================================================

function Invoke-JDHarvesterMS006DiscoveryBridge
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [AllowEmptyCollection()]
        [object[]]
        $Sources
    )

    $enginePath =
        Get-JDHarvesterMS006SourceEnginePath

    # PowerShell 5.1 unwraps a single-element collection when piping it to
    # ConvertTo-Json. PR-019A requires a JSON array because the Node bridge
    # intentionally accepts an array of source candidates. Build each source
    # object independently and wrap the resulting JSON objects explicitly.
    $sourceJsonItems = @(
        $Sources |
            ForEach-Object {
                $_ |
                    ConvertTo-Json `
                        -Depth 20 `
                        -Compress
            }
    )

    $sourcePayload =
        '[{0}]' -f
        ($sourceJsonItems -join ',')

    if(
        [string]::IsNullOrWhiteSpace(
            $sourcePayload
        )
    )
    {
        throw "PR-019A source payload is empty."
    }

    $bridgePath =
        Join-Path `
            $env:TEMP `
            "JD_PR019A_DiscoveryBridge_$([Guid]::NewGuid().ToString('N')).cjs"

    $stdoutPath =
        "$bridgePath.stdout.txt"

    $stderrPath =
        "$bridgePath.stderr.txt"

    $previousPayload =
        $env:JD_MS006_SOURCE_PAYLOAD

    #
    # Real CommonJS file.
    #
    # The bridge performs exactly:
    #
    #     require(engine)
    #     createEngine()
    #     discoverSources()
    #
    # It does not expose or invoke collection.
    #
    $nodeBridge = @'
"use strict";

const enginePath = process.argv[2];

function emitError(error)
{
    if (error && error.stack)
    {
        process.stderr.write(error.stack + "\n");
        return;
    }

    process.stderr.write(String(error) + "\n");
}

process.on("uncaughtException", error => {
    emitError(error);
    process.exitCode = 1;
});

process.on("unhandledRejection", error => {
    emitError(error);
    process.exitCode = 1;
});

(async () => {

    if (!enginePath)
    {
        throw new Error(
            "PR-019A MS-006 engine path argument was not supplied."
        );
    }

    process.stderr.write(
        "[JD-PR019A] Loading MS-006 engine: " +
        enginePath +
        "\n"
    );

    const engine =
        require(enginePath);

    process.stderr.write(
        "[JD-PR019A] Engine module loaded.\n"
    );

    process.stderr.write(
        "[JD-PR019A] createEngine type: " +
        typeof engine.createEngine +
        "\n"
    );

    process.stderr.write(
        "[JD-PR019A] discoverSources type: " +
        typeof engine.discoverSources +
        "\n"
    );

    const payload =
        process.env.JD_MS006_SOURCE_PAYLOAD;

    if (!payload)
    {
        throw new Error(
            "JD_MS006_SOURCE_PAYLOAD is not present."
        );
    }

    const sources =
        JSON.parse(payload);

    const candidates =
        Array.isArray(sources)
            ? sources.map(source => {

                const candidate = {
                    ...source
                };

                if (
                    !candidate.url &&
                    candidate.Url
                )
                {
                    candidate.url =
                        candidate.Url;
                }

                if (
                    !candidate.endpoint &&
                    candidate.Endpoint
                )
                {
                    candidate.endpoint =
                        candidate.Endpoint;
                }

                return candidate;
            })
            : [];

    process.stderr.write(
        "[JD-PR019A] Candidate count: " +
        candidates.length +
        "\n"
    );

    const runtime =
        typeof engine.createEngine === "function"
            ? engine.createEngine()
            : engine;

    process.stderr.write(
        "[JD-PR019A] Runtime created.\n"
    );

    if (
        !runtime ||
        typeof runtime.discoverSources !== "function"
    )
    {
        throw new Error(
            "MS-006 source engine does not expose discoverSources."
        );
    }

    process.stderr.write(
        "[JD-PR019A] Calling discoverSources only.\n"
    );

    const result =
        await runtime.discoverSources(
            candidates
        );

    process.stderr.write(
        "[JD-PR019A] discoverSources returned successfully.\n"
    );

    // PowerShell ConvertFrom-Json treats property names case-insensitively.
    // The MS-006 engine may legitimately expose legacy PascalCase aliases
    // (Url/Endpoint) alongside canonical lower-case fields (url/endpoint).
    // Normalise the engine result before crossing the Node -> PowerShell
    // boundary so the discovery contract contains one representation only.
    function normaliseForPowerShell(value)
    {
        if (Array.isArray(value))
        {
            return value.map(normaliseForPowerShell);
        }

        if (value && typeof value === "object")
        {
            const output = {};

            for (const [key, child] of Object.entries(value))
            {
                const lowerKey = key.toLowerCase();

                if (
                    (lowerKey === "url" || lowerKey === "endpoint") &&
                    Object.prototype.hasOwnProperty.call(value, lowerKey) &&
                    key !== lowerKey
                )
                {
                    continue;
                }

                output[key] = normaliseForPowerShell(child);
            }

            return output;
        }

        return value;
    }

    const powershellSafeResult =
        normaliseForPowerShell(result);

    process.stdout.write(
        JSON.stringify(
            powershellSafeResult,
            null,
            2
        )
    );

})().catch(error => {

    emitError(error);
    process.exitCode = 1;

});
'@

    try
    {
        $env:JD_MS006_SOURCE_PAYLOAD =
            $sourcePayload

        Set-Content `
            -LiteralPath $bridgePath `
            -Value $nodeBridge `
            -Encoding UTF8 `
            -ErrorAction Stop

        #
        # Execute Node through System.Diagnostics.Process rather than the
        # PowerShell native-command redirection surface.
        #
        # PowerShell native stderr handling can convert Node stderr into
        # RemoteException records and can therefore mask the actual JavaScript
        # failure. The Process API captures stdout and stderr as independent
        # streams and preserves the complete Node diagnostic output.
        #
        $nodeCommand =
            Get-Command node.exe `
                -ErrorAction Stop

        $processStartInfo =
            New-Object System.Diagnostics.ProcessStartInfo

        $processStartInfo.FileName =
            $nodeCommand.Source

        $escapedBridgePath =
            $bridgePath.Replace('"', '\"')

        $escapedEnginePath =
            $enginePath.Replace('"', '\"')

        $processStartInfo.Arguments =
            '"{0}" "{1}"' -f
                $escapedBridgePath,
                $escapedEnginePath

        $processStartInfo.UseShellExecute =
            $false

        $processStartInfo.CreateNoWindow =
            $true

        $processStartInfo.RedirectStandardOutput =
            $true

        $processStartInfo.RedirectStandardError =
            $true

        $processStartInfo.EnvironmentVariables['JD_MS006_SOURCE_PAYLOAD'] =
            $sourcePayload

        $process =
            New-Object System.Diagnostics.Process

        $process.StartInfo =
            $processStartInfo

        try
        {
            if(-not $process.Start())
            {
                throw "PR-019A MS-006 Node process could not be started."
            }

            $stdoutTask =
                $process.StandardOutput.ReadToEndAsync()

            $stderrTask =
                $process.StandardError.ReadToEndAsync()

            $process.WaitForExit()

            $stdout =
                $stdoutTask.Result

            $stderr =
                $stderrTask.Result

            $exitCode =
                $process.ExitCode
        }
        finally
        {
            $process.Dispose()
        }

        if($exitCode -ne 0)
        {
            $diagnostic =
                $stderr.Trim()

            if(
                [string]::IsNullOrWhiteSpace(
                    $diagnostic
                )
            )
            {
                $diagnostic =
                    $stdout.Trim()
            }

            if(
                [string]::IsNullOrWhiteSpace(
                    $diagnostic
                )
            )
            {
                $diagnostic =
                    "Node exited with code $exitCode and produced no diagnostic output."
            }

            throw (
                "PR-019A MS-006 discovery bridge failed with Node exit code {0}.`n`n{1}" -f
                $exitCode,
                $diagnostic
            )
        }

        if(
            [string]::IsNullOrWhiteSpace(
                $stdout
            )
        )
        {
            throw "PR-019A MS-006 discovery returned no stdout result."
        }

        try
        {
            return (
                $stdout |
                    ConvertFrom-Json `
                        -ErrorAction Stop
            )
        }
        catch
        {
            throw (
                "PR-019A MS-006 discovery returned invalid JSON.`n`nNode stdout:`n{0}`n`nJSON error:`n{1}" -f
                $stdout.Trim(),
                $_.Exception.Message
            )
        }
    }
    catch
    {
        #
        # Do not collapse the Node exception.
        #
        # Preserve the complete exception chain and stack in the PowerShell
        # error that reaches the PR-019A caller.
        #
        throw (
            "PR-019A MS-006 discovery bridge execution failed.`n`n{0}" -f
            ($_.Exception | Out-String)
        )
    }
    finally
    {
        if($null -eq $previousPayload)
        {
            Remove-Item `
                Env:JD_MS006_SOURCE_PAYLOAD `
                -ErrorAction SilentlyContinue
        }
        else
        {
            $env:JD_MS006_SOURCE_PAYLOAD =
                $previousPayload
        }

        Remove-Item `
            -LiteralPath $bridgePath `
            -Force `
            -ErrorAction SilentlyContinue

        Remove-Item `
            -LiteralPath $stdoutPath `
            -Force `
            -ErrorAction SilentlyContinue

        Remove-Item `
            -LiteralPath $stderrPath `
            -Force `
            -ErrorAction SilentlyContinue
    }
}

# ============================================================================
# PR-019A — CONTROLLED DISCOVERY-ONLY PUBLIC OPERATION
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

    $sources =
        @(
            Get-JDHarvesterSources
        )

    if($sources.Count -eq 0)
    {
        throw (
            "PR-019A discovery cannot execute because no registered Harvester sources are available."
        )
    }

    $configuredSources =
        @(
            $sources |
                Where-Object {

                    $authorisedSourceNames -contains (
                        [string]$_.Name
                    ).ToLowerInvariant()
                }
        )

    if(
        $configuredSources.Count -ne
        $authorisedSourceNames.Count
    )
    {
        $missingSources =
            @(
                $authorisedSourceNames |
                    Where-Object {

                        $name =
                            $_

                        -not (
                            $configuredSources |
                                Where-Object {

                                    (
                                        [string]$_.Name
                                    ).ToLowerInvariant() -eq
                                    $name
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
                $source.PSObject.Properties.Match(
                    "Url"
                ).Count -gt 0
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
                $source.PSObject.Properties.Match(
                    "Endpoint"
                ).Count -gt 0
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

    #
    # Deterministically resolve the actual production engine before any Node
    # process is created.
    #
    $resolvedEnginePath =
        Get-JDHarvesterMS006SourceEnginePath

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "PR-019A discovery boundary using MS-006 engine [{0}]." -f
            $resolvedEnginePath
        )

    #
    # Explicit discovery-only boundary.
    #
    # No queue operation.
    # No source execution statistics.
    # No collection.
    # No persistence.
    #
    return (
        Invoke-JDHarvesterMS006DiscoveryBridge `
            -Sources $configuredSources
    )
}

# ============================================================================
# EXPORT PUBLIC HARVESTER API
# ============================================================================

Export-ModuleMember -Function @(

    #
    # Runtime Lifecycle
    #
    "Start-JDHarvester",
    "Stop-JDHarvester",
    "Restart-JDHarvester",
    "Pause-JDHarvester",
    "Resume-JDHarvester",
    "Get-JDHarvesterStatus",
    "Get-JDHarvesterHealth",
    "Get-JDHarvesterMetrics",
    "Register-JDHarvesterService",

    #
    # Source Registration / Configuration
    #
    "Register-JDHarvesterSources",
    "Set-JDHarvesterSourceConfiguration",

    #
    # PR-019A Discovery
    #
    "Invoke-JDHarvesterSourceDiscovery",

    #
    # Existing Harvester Execution Surface
    #
    "Invoke-JDHarvesterCycle"

)

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCAE9fwuO3irK+o/
# NB9j0yZebZbr+RiIbg4n7VzX5qulb6CCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
# hkBUqlImjcK6MA0GCSqGSIb3DQEBCwUAMDExLzAtBgNVBAMMJkp1c3REZWZlbmRl
# cnMgRW5naW5lZXJpbmcgQ29kZSBTaWduaW5nMB4XDTI2MDgxODA3NDMyMFoXDTI5
# MDgxODA3NTMyMFowMTEvMC0GA1UEAwwmSnVzdERlZmVuZGVycyBFbmdpbmVlcmlu
# ZyBDb2RlIFNpZ25pbmcwggGiMA0GCSqGSIb3DQEBAQUAA4IBjwAwggGKAoIBgQC/
# 0gyggU2vrIU3diuEoUz87AX4B2dwQBLDuPVGmCHC0fIL85/3mQNcpgfmKiufvCNG
# tBoimMjdLBKNI9XJ40+/0HCcRZ+iD1EV6C2RylsOZUR0NK1ospy6sBY0949pAuMz
# fs4lwOFmrte3qjQzg/nrSBOm6BOpebMGYEmbx6x82Wu+m/JvWRYcfATGFYqI4ksh
# M3UPDNW0qnWIiwtVpIZ8Vg6jJNl3kzZu2bf/+Az5RWAi/w4vRvX4UDQs87rD6v/C
# wRO+QTqADZinVcQwGdWsz7zYbIBQs1JqI4JEeYi+9Z3tp7jaF3j2I1vjjzMjqjl1
# 37tTC5bYiA37h1QEmPr/EqdVqo+iBLnDzn1brfdHDahERU8dHtpdUL/k7odEBFvc
# n4YEHxo42Y0hqCmYiU7zTKejewNV5EjaOV1oyufzbLp6SDdWDlZNM3cta4IC12BB
# lfASJmF11wspHRzvwstDZ84BfYQp7xUxsO5xsqtej1YrQ247IPxRnagV94PxS6UC
# AwEAAaNGMEQwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMB0G
# A1UdDgQWBBQxvlpFbAcvv3R+OhH0Eu4kKq516zANBgkqhkiG9w0BAQsFAAOCAYEA
# jGqAu0v+gtBfQbvfDWh2QMWT+WfqpD1KrcRuVhKByDHtbmLrZgcIB83l0vqryvBj
# 7kzQnMpXc/R3xpXwdSoGGYmx7f9iofbX1o1gaAQMgUf3PDahDr69XcvcnVE9/Wp7
# AYSl6ZEYIknR7sxFb0whyafrzIPiz252GIMyUFhVozUp4pzyWx4kTwlI1lJPmr5+
# g8B4MnuWkhfprjx0vu0ypiFXexobZBO1exkvKQhlZztzos8Bs3XfMC7w7XkrShn2
# 7MXuyROg9/U7JzPvQAuMxFLiPT3K1ImmQTLIlyt3Cy6B+pZW+JDNOdmbgnB6O2zI
# rDAlpxTfnc+Rqcw8T5FK/mK9OdxF19TLnNfWeVd7PbVfRrW4PC8Nt3Py9l/s4nba
# JG9ggzH+8suC3rjDG0HsoMcre3FX1/oo5OwPMYGebMPqFWW2ce18rh4+oid7NdI4
# ZDDImNlwAI7lF9ewvSJ6Y5czizJDuddxbt2ZL+H/uXvqLny/1/vA8USTtljIzxBO
# MYICdzCCAnMCAQEwRTAxMS8wLQYDVQQDDCZKdXN0RGVmZW5kZXJzIEVuZ2luZWVy
# aW5nIENvZGUgU2lnbmluZwIQJTYCjn9RVYZAVKpSJo3CujANBglghkgBZQMEAgEF
# AKCBhDAYBgorBgEEAYI3AgEMMQowCKACgAChAoAAMBkGCSqGSIb3DQEJAzEMBgor
# BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
# DQEJBDEiBCC9Teyy2qnkqkGceJPJU/op+P+qcNpQP2xJJtGX4KHUXzANBgkqhkiG
# 9w0BAQEFAASCAYC5tsutJqKzIAWEhiEJC+6tbXRpSABXLmBTVN0DNGodDCCaAEXQ
# yPn+ZYL3lAXNUPkj+tFuhecWvipY3El3IDVQCRHE5qvyetaShOSleJWOoDEsYx7E
# ZCy0t//hDfdRnyqSQV2OdemgtiUsbmNae8HbfWLwLD5T76AzQn7I55EdGMZjRap9
# v06Ei+A0atlGsDla/e4Qvh+nOjXlmrND1Cal78MQqKKwUdTbpw42yOj6Aq+i0n0K
# hs+X9Ie+7xKO+40RMXyTOQ4vS9adomJ8h3h/XPYcZandoTdVLPBo0s5yuLs8EWlV
# s6FRpzI3tHoOf9uBGnUW/ULWRf90tIpCdhJ0lahRxWxV6mxqFSUk2ErTjGFFMr7Y
# z+1T82tbSH/2m2aHLaDb+7W6tY6luEX94adSxlAHL2JclWm/7xZ5fYXkTkWV9ySY
# W8g/mt5Py3TTuG7/HoZdmI9uTRlF4QAeuy3tOYf8dlBKnALEMQ8o9X1WO7xlZJJA
# 8N7o462cAUlcJQ0=
# SIG # End signature block
