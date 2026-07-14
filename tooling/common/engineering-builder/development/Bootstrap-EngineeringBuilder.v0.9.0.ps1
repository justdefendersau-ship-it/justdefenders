<#
==============================================================================
JustDefenders©
==============================================================================
File
    Bootstrap-EngineeringBuilder.ps1

Full Path
    C:\dev\justdefenders\frontend\tooling\common\engineering-builder\
    Bootstrap-EngineeringBuilder.ps1

Timestamp
    14 July 2026 19:15

Work Package
    WP-BUILD-000

Component
    Engineering Builder Bootstrap

Purpose
    Bootstrap the JustDefenders Engineering Module Builder by automatically
    assembling Engineering-Builder.psm1 from Production Revision files.

Responsibilities

    • Discover Production Revisions
    • Validate Revision Sequence
    • Validate Required Files
    • Backup Existing Module
    • Assemble Engineering-Builder.psm1
    • Validate Parser
    • Produce Bootstrap Log
    • Produce PASS / FAIL Summary

Dependencies

    • PowerShell 7.5+
    • .NET Runtime

Notes

    This script exists solely to bootstrap the Engineering Builder.

    Once Engineering-Builder.psm1 has been created successfully,
    Invoke-EngineeringBuild.ps1 becomes the primary build mechanism.

==============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

#==============================================================================
# Engineering Constants
#==============================================================================

$Script:BootstrapVersion = '1.0.0'

$Script:BootstrapTimestamp = Get-Date

$Script:Separator = ('=' * 78)

#==============================================================================
# Helper Functions
#==============================================================================

function Write-JDBootstrapBanner {

    Write-Host ""
    Write-Host $Script:Separator -ForegroundColor Cyan
    Write-Host "JustDefenders Engineering Bootstrap" -ForegroundColor Cyan
    Write-Host $Script:Separator -ForegroundColor Cyan
    Write-Host ""
}

function Write-JDStatus {

    param(

        [Parameter(Mandatory)]
        [string]$Message,

        [ValidateSet(
            'INFO',
            'PASS',
            'WARN',
            'FAIL'
        )]
        [string]$Level = 'INFO'

    )

    switch ($Level) {

        'PASS' {

            Write-Host "[PASS] $Message" -ForegroundColor Green

        }

        'WARN' {

            Write-Host "[WARN] $Message" -ForegroundColor Yellow

        }

        'FAIL' {

            Write-Host "[FAIL] $Message" -ForegroundColor Red

        }

        default {

            Write-Host "[INFO] $Message" -ForegroundColor Cyan

        }

    }

}

#==============================================================================
# Path Resolution
#==============================================================================

$BootstrapRoot = Split-Path -Parent $PSCommandPath

$DevelopmentFolder = Join-Path `
    $BootstrapRoot `
    'development'

$OutputModule = Join-Path `
    $BootstrapRoot `
    'Engineering-Builder.psm1'

$BackupFolder = Join-Path `
    $BootstrapRoot `
    'backup'

$LogFolder = Join-Path `
    $BootstrapRoot `
    'logs'

$BootstrapLog = Join-Path `
    $LogFolder `
    ("Bootstrap-" + (Get-Date -Format 'yyyyMMdd-HHmmss') + ".log")

#==============================================================================
# Create Required Folders
#==============================================================================

foreach ($Folder in @(
    $BackupFolder,
    $LogFolder
)) {

    if (-not (Test-Path $Folder)) {

        New-Item `
            -ItemType Directory `
            -Path $Folder `
            -Force | Out-Null

    }

}

#==============================================================================
# Logging
#==============================================================================

function Write-JDBootstrapLog {

    param(

        [string]$Message

    )

    $Timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

    Add-Content `
        -LiteralPath $BootstrapLog `
        -Value "$Timestamp  $Message"

}

Write-JDBootstrapBanner

Write-JDBootstrapLog "Bootstrap Started"

Write-JDStatus "Bootstrap Version $Script:BootstrapVersion"

Write-JDStatus "Development Folder"

Write-Host "    $DevelopmentFolder"

#==============================================================================
# Revision Discovery
#==============================================================================

Write-JDStatus "Discovering Production Revisions..."

$RevisionFiles = Get-ChildItem `
    -LiteralPath $DevelopmentFolder `
    -Filter 'Engineering-Builder.Production.PR-*.psm1' `
    -File |
    Sort-Object Name

if ($RevisionFiles.Count -eq 0) {

    Write-JDStatus `
        "No Production Revisions Found." `
        FAIL

    throw "Bootstrap cannot continue."

}

Write-JDStatus `
    "$($RevisionFiles.Count) Production Revisions Found." `
    PASS

#==============================================================================
# Revision Validation
#==============================================================================

Write-JDStatus "Validating Revision Sequence..."

$ExpectedRevision = 1

foreach ($Revision in $RevisionFiles) {

    if ($Revision.Name -notmatch 'PR-(\d{3})') {

        Write-JDStatus `
            "Unable to determine revision number: $($Revision.Name)" `
            FAIL

        throw "Invalid revision filename."

    }

    $CurrentRevision = [int]$Matches[1]

    if ($CurrentRevision -ne $ExpectedRevision) {

        Write-JDStatus `
            ("Expected PR-{0:000} but found PR-{1:000}" -f `
                $ExpectedRevision,
                $CurrentRevision) `
            FAIL

        throw "Revision sequence validation failed."

    }

    Write-JDStatus `
        ("PR-{0:000} OK" -f $CurrentRevision) `
        PASS

    Write-JDBootstrapLog `
        ("Validated PR-{0:000}" -f $CurrentRevision)

    $ExpectedRevision++

}

#==============================================================================
# Existing Module Backup
#==============================================================================

Write-JDStatus "Checking Existing Engineering-Builder.psm1..."

if (Test-Path $OutputModule) {

    $BackupFile = Join-Path `
        $BackupFolder `
        ("Engineering-Builder-" +
            (Get-Date -Format "yyyyMMdd-HHmmss") +
            ".psm1")

    Copy-Item `
        -LiteralPath $OutputModule `
        -Destination $BackupFile `
        -Force

    Write-JDStatus "Existing module backed up." PASS

    Write-JDBootstrapLog `
        "Existing module backed up."

}
else {

    Write-JDStatus `
        "No existing module detected." `
        INFO

}

#==============================================================================
# Assembly
#==============================================================================

Write-JDStatus "Assembling Engineering Builder..."

$Builder = New-Object System.Text.StringBuilder

foreach ($Revision in $RevisionFiles) {

    Write-JDStatus `
        ("Adding " + $Revision.Name)

    Write-JDBootstrapLog `
        ("Reading " + $Revision.Name)

    $Content = Get-Content `
        -LiteralPath $Revision.FullName `
        -Raw

    #
    # Future Enhancement
    #
    # Header/Footer stripping will be implemented in
    # Engineering Builder v1.0.
    #

    [void]$Builder.AppendLine($Content)

    [void]$Builder.AppendLine()

}

$Builder.ToString() |
    Set-Content `
        -LiteralPath $OutputModule `
        -Encoding UTF8

Write-JDStatus `
    "Engineering-Builder.psm1 written." `
    PASS

Write-JDBootstrapLog `
    "Module written."

#==============================================================================
# Parser Validation
#==============================================================================

Write-JDStatus "Running Parser Validation..."

$Tokens = $null
$Errors = $null

[System.Management.Automation.Language.Parser]::ParseFile(

    $OutputModule,

    [ref]$Tokens,

    [ref]$Errors

) | Out-Null

if ($Errors.Count -gt 0) {

    Write-JDStatus `
        ("Parser detected {0} error(s)." -f $Errors.Count) `
        FAIL

    foreach ($Error in $Errors) {

        Write-Host $Error

        Write-JDBootstrapLog `
            $Error.Message

    }

    throw "Parser validation failed."

}

Write-JDStatus `
    "Parser validation passed." `
    PASS

Write-JDBootstrapLog `
    "Parser validation successful."

#==============================================================================
# Module Import Validation
#==============================================================================

Write-JDStatus `
    "Importing Engineering Builder..."

Import-Module `
    $OutputModule `
    -Force

Write-JDStatus `
    "Import successful." `
    PASS

Write-JDBootstrapLog `
    "Module imported successfully."
#==============================================================================
# Build Statistics
#==============================================================================

Write-JDStatus `
    "Collecting Build Statistics..."

$ModuleInfo = Get-Item `
    -LiteralPath $OutputModule

$Elapsed = (Get-Date) - $Script:BootstrapTimestamp

Write-JDBootstrapLog `
    "Build statistics collected."

#==============================================================================
# Bootstrap Summary
#==============================================================================

Write-Host ""
Write-Host $Script:Separator -ForegroundColor Cyan
Write-Host "Bootstrap Summary" -ForegroundColor Cyan
Write-Host $Script:Separator -ForegroundColor Cyan
Write-Host ""

Write-Host ("Bootstrap Version : {0}" -f `
    $Script:BootstrapVersion)

Write-Host ("Production Revisions : {0}" -f `
    $RevisionFiles.Count)

Write-Host ("Output Module : {0}" -f `
    $OutputModule)

Write-Host ("Module Size : {0:N0} bytes" -f `
    $ModuleInfo.Length)

Write-Host ("Elapsed Time : {0}" -f `
    $Elapsed)

Write-Host ("Bootstrap Log : {0}" -f `
    $BootstrapLog)

Write-Host ""

Write-JDBootstrapLog `
    "Bootstrap Summary Generated"

#==============================================================================
# Final Validation
#==============================================================================

Write-JDStatus `
    "Final Engineering Validation..."

if (-not (Test-Path `
    -LiteralPath `
    $OutputModule)) {

    Write-JDStatus `
        "Engineering-Builder.psm1 not found." `
        FAIL

    throw "Bootstrap validation failed."

}

if ($ModuleInfo.Length -eq 0) {

    Write-JDStatus `
        "Engineering-Builder.psm1 is empty." `
        FAIL

    throw "Bootstrap validation failed."

}

Write-JDStatus `
    "Engineering Builder successfully bootstrapped." `
    PASS

Write-JDBootstrapLog `
    "Engineering Builder successfully bootstrapped."

#==============================================================================
# Completion Banner
#==============================================================================

Write-Host ""

Write-Host $Script:Separator `
    -ForegroundColor Green

Write-Host `
    "JUSTDEFENDERS ENGINEERING BOOTSTRAP COMPLETED SUCCESSFULLY" `
    -ForegroundColor Green

Write-Host $Script:Separator `
    -ForegroundColor Green

Write-Host ""

Write-Host `
    ("Engineering Builder Version : {0}" -f `
        $Script:BootstrapVersion)

Write-Host `
    ("Production Revisions Built : {0}" -f `
        $RevisionFiles.Count)

Write-Host `
    ("Output Module : {0}" -f `
        $OutputModule)

Write-Host `
    ("Elapsed : {0}" -f `
        $Elapsed)

Write-Host ""

Write-JDBootstrapLog `
    "Bootstrap completed successfully."

#==============================================================================
# Exit
#==============================================================================

exit 0

#==============================================================================
# END OF FILE
#==============================================================================