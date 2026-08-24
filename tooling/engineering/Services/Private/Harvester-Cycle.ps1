<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-Cycle.ps1

Timestamp
15th August 2026 12:31 Sydney

Work Package
PR-019B

Component
Harvester Runtime

Purpose
Coordinates a complete Harvester execution cycle.

PR-019B Authority
REAL SOURCE ACQUISITION AND QUEUE POPULATION

Responsibilities

    • Coordinate the existing Harvester execution lifecycle.
    • Read the authoritative registered Harvester source set.
    • Activate enabled configured sources through the existing source registry.
    • Invoke the authoritative MS-006 production source engine.
    • Execute real MS-006 collectSource() acquisition.
    • Convert successful MS-006 collection results into Harvester queue items.
    • Preserve source identity and provenance.
    • Update existing Harvester source execution statistics.
    • Update existing Harvester cycle statistics.
    • Process the existing Harvester queue.
    • Preserve the existing public Invoke-JDHarvesterCycle API.

Architecture

    Harvester Runtime
        ->
    Harvester-Cycle
        ->
    existing Harvester Source Registry
        ->
    existing MS-006 production engine
        ->
    collectSource()
        ->
    Harvester Queue
        ->
    existing queue processor

Dependencies

    • Harvester-State.ps1
    • Harvester-Manager.ps1
    • Harvester-Queue.ps1
    • Harvester-Sources.ps1
    • Engineering-Common
    • Harvester-Runtime.psm1 MS-006 engine path resolver

Explicitly NOT performed here

    • Source registration
    • Source discovery authority
    • New source-engine implementation
    • New queue implementation
    • Persistence
    • Federation
    • Scheduler ownership
    • Managed-service ownership
    • Parallel runtime creation

The MS-006 production engine remains the owner of acquisition behaviour.
This file provides only the existing Harvester execution integration boundary.
==============================================================================#
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-JDHarvesterCycle
{
    [CmdletBinding()]
    param()

    Assert-JDHarvesterReady

    $started = Get-Date
    $state = Get-JDHarvesterState

    Start-JDHarvesterExecution -Phase "Harvest" | Out-Null

    Write-JDEngineeringLog -Level Information -Message "Harvester cycle started."

    $sources = @(
        Get-JDHarvesterSources |
            Where-Object { $_.Enabled }
    )

    if($sources.Count -eq 0)
    {
        Write-JDEngineeringLog -Level Warning -Message "Harvester cycle has no enabled registered sources."

        Process-JDHarvesterQueue | Out-Null

        $elapsed = ((Get-Date) - $started).TotalMilliseconds

        Complete-JDHarvesterExecution -ElapsedMilliseconds ([int]$elapsed) | Out-Null

        return Get-JDHarvesterCycleSummary
    }

    foreach($source in $sources)
    {
        try
        {
            Invoke-JDHarvesterSource -Source $source | Out-Null
        }
        catch
        {
            $reason = $_.Exception.Message

            try
            {
                Register-JDHarvesterSourceFailure `
                    -Name $source.Name `
                    -Reason $reason |
                    Out-Null
            }
            catch
            {
                Write-JDEngineeringLog `
                    -Level Error `
                    -Message (
                        "Unable to register source failure for [{0}]: {1}" -f
                        $source.Name,
                        $_.Exception.Message
                    )
            }

            Register-JDHarvesterFailure `
                -Reason (
                    "Source [{0}] acquisition failed: {1}" -f
                    $source.Name,
                    $reason
                ) |
                Out-Null

            Write-JDEngineeringLog `
                -Level Error `
                -Message (
                    "Harvester source [{0}] failed: {1}" -f
                    $source.Name,
                    $reason
                )
        }
    }

    Process-JDHarvesterQueue | Out-Null

    $elapsed = ((Get-Date) - $started).TotalMilliseconds

    Complete-JDHarvesterExecution `
        -ElapsedMilliseconds ([int]$elapsed) |
        Out-Null

    return Get-JDHarvesterCycleSummary
}

function Invoke-JDHarvesterSource
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [pscustomobject]
        $Source
    )

    if($null -eq $Source)
    {
        throw "Harvester source execution received a null source."
    }

    if([string]::IsNullOrWhiteSpace([string]$Source.Name))
    {
        throw "Harvester source execution received a source without a name."
    }

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Beginning PR-019B acquisition for source [{0}]." -f
            $Source.Name
        )

    $sourceUrl = Get-JDHarvesterSourceExecutionUrl -Source $Source

    if([string]::IsNullOrWhiteSpace($sourceUrl))
    {
        throw (
            "Harvester source [{0}] has no configured Url or Endpoint." -f
            $Source.Name
        )
    }

    if(-not $Source.Connected)
    {
        Write-JDEngineeringLog `
            -Level Information `
            -Message (
                "Activating configured Harvester source [{0}] through the existing source registry." -f
                $Source.Name
            )

        $Source = Connect-JDHarvesterSource -Name $Source.Name
    }

    $state = Get-JDHarvesterState
    $state.CurrentSource = $Source.Name
    $state.CurrentPhase = "Acquiring"

    Update-JDHarvesterHeartbeat | Out-Null

    $collectionResult = Invoke-JDHarvesterMS006Collection -Source $Source

    if($null -eq $collectionResult)
    {
        throw (
            "MS-006 collection returned no result for source [{0}]." -f
            $Source.Name
        )
    }

    $recordsCollected =
        if($collectionResult.PSObject.Properties.Match("recordsCollected").Count -gt 0)
        {
            [int]$collectionResult.recordsCollected
        }
        else
        {
            0
        }

    $success =
        if($collectionResult.PSObject.Properties.Match("success").Count -gt 0)
        {
            [bool]$collectionResult.success
        }
        else
        {
            $false
        }

    if(-not $success)
    {
        $collectionError =
            if($collectionResult.PSObject.Properties.Match("error").Count -gt 0)
            {
                [string]$collectionResult.error
            }
            else
            {
                "MS-006 collection failed without a diagnostic."
            }

        throw (
            "MS-006 acquisition failed for source [{0}]: {1}" -f
            $Source.Name,
            $collectionError
        )
    }

    if($recordsCollected -gt 0)
    {
        Add-JDHarvesterQueueItem -Item $collectionResult | Out-Null

        Update-JDHarvesterCycleStatistics `
            -DocumentsDiscovered $recordsCollected |
            Out-Null
    }

    Update-JDHarvesterSourceExecution `
        -Name $Source.Name `
        -Documents $recordsCollected |
        Out-Null

    $state.CurrentPhase = "Acquired"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "PR-019B acquisition completed for [{0}]. Records acquired: {1}." -f
            $Source.Name,
            $recordsCollected
        )

    return $collectionResult
}

function Get-JDHarvesterSourceExecutionUrl
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [pscustomobject]
        $Source
    )

    $url = ""

    if($Source.PSObject.Properties.Match("Url").Count -gt 0)
    {
        $url = [string]$Source.Url
    }

    if(
        [string]::IsNullOrWhiteSpace($url) -and
        $Source.PSObject.Properties.Match("Endpoint").Count -gt 0
    )
    {
        $url = [string]$Source.Endpoint
    }

    if([string]::IsNullOrWhiteSpace($url))
    {
        return ""
    }

    try
    {
        $parsed = [System.Uri]$url
    }
    catch
    {
        throw (
            "Harvester source [{0}] has an invalid configured URL or Endpoint: {1}" -f
            $Source.Name,
            $url
        )
    }

    if($parsed.Scheme -notin @("http", "https"))
    {
        throw (
            "Harvester source [{0}] uses an unsupported URL scheme: {1}" -f
            $Source.Name,
            $parsed.Scheme
        )
    }

    return $parsed.AbsoluteUri
}

function Invoke-JDHarvesterMS006Collection
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [pscustomobject]
        $Source
    )

    $enginePath = Get-JDHarvesterMS006SourceEnginePath

    if([string]::IsNullOrWhiteSpace($enginePath))
    {
        throw "PR-019B could not resolve the MS-006 source engine path."
    }

    if(-not (Test-Path -LiteralPath $enginePath -PathType Leaf))
    {
        throw (
            "PR-019B MS-006 source engine does not exist: {0}" -f
            $enginePath
        )
    }

    $sourcePayload =
        @($Source) |
        ConvertTo-Json -Depth 20 -Compress

    if([string]::IsNullOrWhiteSpace($sourcePayload))
    {
        throw (
            "PR-019B source payload is empty for source [{0}]." -f
            $Source.Name
        )
    }

    $bridgePath =
        Join-Path $env:TEMP "JD_PR019B_CollectionBridge_$([Guid]::NewGuid().ToString('N')).cjs"

    $previousPayload = $env:JD_MS006_COLLECTION_SOURCE_PAYLOAD

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
            "PR-019B MS-006 engine path argument was not supplied."
        );
    }

    const engine = require(enginePath);

    const payload =
        process.env.JD_MS006_COLLECTION_SOURCE_PAYLOAD;

    if (!payload)
    {
        throw new Error(
            "JD_MS006_COLLECTION_SOURCE_PAYLOAD is not present."
        );
    }

    const source = JSON.parse(payload);

    if (!source || typeof source !== "object")
    {
        throw new Error(
            "PR-019B collection source payload is not an object."
        );
    }

    const candidate = { ...source };

    if (!candidate.url && candidate.Url)
    {
        candidate.url = candidate.Url;
    }

    if (!candidate.endpoint && candidate.Endpoint)
    {
        candidate.endpoint = candidate.Endpoint;
    }

    if (!candidate.query && candidate.Query)
    {
        candidate.query = candidate.Query;
    }

    const runtime =
        typeof engine.createEngine === "function"
            ? engine.createEngine()
            : engine;

    if (
        !runtime ||
        typeof runtime.collectSource !== "function"
    )
    {
        throw new Error(
            "MS-006 source engine does not expose collectSource."
        );
    }

    const result =
        await runtime.collectSource(candidate);

    if (result === undefined)
    {
        throw new Error(
            "MS-006 collectSource returned undefined."
        );
    }

    process.stdout.write(JSON.stringify(result, null, 2));

})().catch(error => {

    emitError(error);
    process.exitCode = 1;

});
'@

    try
    {
        $env:JD_MS006_COLLECTION_SOURCE_PAYLOAD = $sourcePayload

        Set-Content `
            -LiteralPath $bridgePath `
            -Value $nodeBridge `
            -Encoding UTF8 `
            -ErrorAction Stop

        $nodeCommand =
            Get-Command node.exe -ErrorAction Stop

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

        $processStartInfo.UseShellExecute = $false
        $processStartInfo.CreateNoWindow = $true
        $processStartInfo.RedirectStandardOutput = $true
        $processStartInfo.RedirectStandardError = $true

        $processStartInfo.EnvironmentVariables[
            "JD_MS006_COLLECTION_SOURCE_PAYLOAD"
        ] = $sourcePayload

        $process =
            New-Object System.Diagnostics.Process

        $process.StartInfo = $processStartInfo

        try
        {
            if(-not $process.Start())
            {
                throw (
                    "PR-019B MS-006 Node process could not be started for source [{0}]." -f
                    $Source.Name
                )
            }

            $stdoutTask =
                $process.StandardOutput.ReadToEndAsync()

            $stderrTask =
                $process.StandardError.ReadToEndAsync()

            $process.WaitForExit()

            $stdout = $stdoutTask.Result
            $stderr = $stderrTask.Result
            $exitCode = $process.ExitCode
        }
        finally
        {
            $process.Dispose()
        }

        if($exitCode -ne 0)
        {
            $diagnostic = $stderr.Trim()

            if([string]::IsNullOrWhiteSpace($diagnostic))
            {
                $diagnostic = $stdout.Trim()
            }

            if([string]::IsNullOrWhiteSpace($diagnostic))
            {
                $diagnostic =
                    "Node exited with code $exitCode and produced no diagnostic output."
            }

            throw (
                "PR-019B MS-006 collection bridge failed for source [{0}] with Node exit code {1}.`n`n{2}" -f
                $Source.Name,
                $exitCode,
                $diagnostic
            )
        }

        if([string]::IsNullOrWhiteSpace($stdout))
        {
            throw (
                "PR-019B MS-006 collection returned no stdout result for source [{0}]." -f
                $Source.Name
            )
        }

        try
        {
            $result =
                $stdout |
                    ConvertFrom-Json -ErrorAction Stop
        }
        catch
        {
            throw (
                "PR-019B MS-006 collection returned invalid JSON for source [{0}].`n`nNode stdout:`n{1}`n`nJSON error:`n{2}" -f
                $Source.Name,
                $stdout.Trim(),
                $_.Exception.Message
            )
        }

        return $result
    }
    catch
    {
        throw (
            "PR-019B MS-006 collection bridge execution failed for source [{0}].`n`n{1}" -f
            $Source.Name,
            ($_.Exception | Out-String)
        )
    }
    finally
    {
        if($null -eq $previousPayload)
        {
            Remove-Item Env:JD_MS006_COLLECTION_SOURCE_PAYLOAD -ErrorAction SilentlyContinue
        }
        else
        {
            $env:JD_MS006_COLLECTION_SOURCE_PAYLOAD =
                $previousPayload
        }

        Remove-Item `
            -LiteralPath $bridgePath `
            -Force `
            -ErrorAction SilentlyContinue
    }
}

function Process-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    while(-not (Test-JDHarvesterQueueEmpty))
    {
        $item = Remove-JDHarvesterQueueItem

        if($null -eq $item)
        {
            continue
        }

        try
        {
            Process-JDHarvesterQueueItem -Item $item | Out-Null
        }
        catch
        {
            Register-JDHarvesterFailure -Reason $_.Exception.Message | Out-Null
            Add-JDHarvesterRetryItem -Item $item | Out-Null
        }
    }

    return $true
}

function Process-JDHarvesterQueueItem
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Item
    )

    $state = Get-JDHarvesterState

    $state.CurrentJob = $Item
    $state.CurrentPhase = "Processing"

    Update-JDHarvesterHeartbeat | Out-Null

    $state.Statistics.DocumentsProcessed++

    if($Item.PSObject.Properties.Match("Inserted").Count -gt 0)
    {
        if($Item.Inserted)
        {
            $state.Statistics.DocumentsInserted++
        }
    }

    if($Item.PSObject.Properties.Match("Updated").Count -gt 0)
    {
        if($Item.Updated)
        {
            $state.Statistics.DocumentsUpdated++
        }
    }

    if($Item.PSObject.Properties.Match("Duplicate").Count -gt 0)
    {
        if($Item.Duplicate)
        {
            $state.Statistics.DuplicatesSkipped++
        }
    }

    Update-JDHarvesterHeartbeat | Out-Null

    return $true
}

function Update-JDHarvesterCycleStatistics
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [int]
        $DocumentsDiscovered
    )

    $state = Get-JDHarvesterState

    $state.Statistics.DocumentsDiscovered +=
        $DocumentsDiscovered

    Update-JDHarvesterHeartbeat | Out-Null

    return $state.Statistics
}

function Invoke-JDHarvesterCycleFailure
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Reason
    )

    Register-JDHarvesterFailure -Reason $Reason | Out-Null

    Write-JDEngineeringLog `
        -Level Error `
        -Message ("Harvester cycle failed: {0}" -f $Reason)

    return $false
}

function Get-JDHarvesterCycleSummary
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    [PSCustomObject]@{
        Success = ($state.HealthState -ne "FAILED")
        Running = $state.Running
        Health = $state.HealthState
        CurrentPhase = $state.CurrentPhase
        QueueDepth = $state.Queue.QueueDepth
        ActiveWorkers = $state.Queue.ActiveWorkers
        CrawlCount = $state.Statistics.CrawlCount
        SchedulerExecutions = $state.Statistics.SchedulerExecutions
        DocumentsDiscovered = $state.Statistics.DocumentsDiscovered
        DocumentsProcessed = $state.Statistics.DocumentsProcessed
        DocumentsInserted = $state.Statistics.DocumentsInserted
        DocumentsUpdated = $state.Statistics.DocumentsUpdated
        DuplicatesSkipped = $state.Statistics.DuplicatesSkipped
        FailedDocuments = $state.Statistics.FailedDocuments
        RetryCount = $state.Statistics.RetryCount
        AverageRunMilliseconds = $state.Statistics.AverageRunMilliseconds
        LongestRunMilliseconds = $state.Statistics.LongestRunMilliseconds
        LastRun = $state.LastRun
        LastSuccessfulRun = $state.LastSuccessfulRun
        LastHeartbeat = $state.LastHeartbeat
        Timestamp = Get-Date
    }
}

function Test-JDHarvesterCycle
{
    [CmdletBinding()]
    param()

    if(-not (Test-JDHarvesterHealthy))
    {
        return $false
    }

    if(-not (Test-JDHarvesterQueue))
    {
        return $false
    }

    if(-not (Test-JDHarvesterSourceRegistry))
    {
        return $false
    }

    return $true
}

function Reset-JDHarvesterCycle
{
    [CmdletBinding()]
    param()

    Clear-JDHarvesterQueue | Out-Null

    $state = Get-JDHarvesterState

    $state.CurrentJob = $null
    $state.CurrentSource = $null
    $state.CurrentPhase = "Idle"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester cycle reset."

    return Get-JDHarvesterCycleSummary
}

function Get-JDHarvesterCycleMetrics
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    [PSCustomObject]@{
        CrawlCount = $state.Statistics.CrawlCount
        SchedulerExecutions = $state.Statistics.SchedulerExecutions
        QueueDepth = $state.Queue.QueueDepth
        ActiveWorkers = $state.Queue.ActiveWorkers
        DocumentsDiscovered = $state.Statistics.DocumentsDiscovered
        DocumentsProcessed = $state.Statistics.DocumentsProcessed
        DocumentsInserted = $state.Statistics.DocumentsInserted
        DocumentsUpdated = $state.Statistics.DocumentsUpdated
        DuplicatesSkipped = $state.Statistics.DuplicatesSkipped
        FailedDocuments = $state.Statistics.FailedDocuments
        RetryCount = $state.Statistics.RetryCount
        AverageRunMilliseconds = $state.Statistics.AverageRunMilliseconds
        LongestRunMilliseconds = $state.Statistics.LongestRunMilliseconds
        LastHeartbeat = $state.LastHeartbeat
        Timestamp = Get-Date
    }
}

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCDC1dkdTHhXMPGo
# /6zmingZfhWqPEutJfJNkDwuX/BRYqCCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
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
# DQEJBDEiBCBb/raMOqg6SKPiuckurUyfNzxL9BDiRq2hWWU3xEms4DANBgkqhkiG
# 9w0BAQEFAASCAYBu54toXbwxf/a28+O3lXpLZ2MbsCytYJn1wJpbRamEhuDmKvds
# 1e4hGTpd/NMFrN5RSBI8ZjB6spUESzyBXbJ6/JqcqDuKbOqd4iuRQjfLEKp1rAvE
# EHTLeIM/m2bx/dDkwMSaWq0kpAs8oD2+bYJFrRj/EHMkAX9rLCVrSeQ1kTlfsPDl
# 77t/yd6BAShf0wHSqlW9sguGO9CiEZFNH4afAxqF+6FkFCeQ34N9G8CxGiKr82bG
# D+58z1QtIlBPWuEmPKQbfWy/1XA9vPw+FNbU4FU3y6GSqWNJLmRHGfsI9CIXBREc
# 05HPwj81GyuDbN5k5q8SRMlMYEM75eNAOfwJKpMJnsXFkPRg+D54gGu3O1WZAVPo
# UBhykIMVMivFaM5ZGoRy0xEi3DnTZECupBkRCiSaZnWV21XyMbp8WoUqeGTMJFEY
# HABycJJffWnc4sViGFTUw5y8qW9KK0Uct3e/jkD0Wb6TMGywPTWyh895f1L2yQ/X
# Y/PvhNofwDhUL7M=
# SIG # End signature block
