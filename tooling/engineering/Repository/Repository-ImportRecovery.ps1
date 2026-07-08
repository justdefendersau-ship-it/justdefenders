<#
JustDefenders© Engineering
Repository-ImportRecovery.ps1
RC-007A Discovery / Repair Utility
#>
[CmdletBinding(SupportsShouldProcess=$true)]
param(
 [string]$RepositoryRoot=(Get-Location).Path,
 [switch]$Repair
)
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$stats=[ordered]@{FilesScanned=0;Findings=0;FilesModified=0;ImportsRepaired=0}
function I($m){Write-Host "[INFO ] $m"}
function P($m){Write-Host "[PASS ] $m"}
function W($m){Write-Host "[WARN ] $m"}
I "Repository Root: $RepositoryRoot"
$files=Get-ChildItem $RepositoryRoot -Recurse -File -Include *.ts,*.tsx |?{
 $_.FullName -notmatch '\\node_modules\\|\\\.next\\|\\\.git\\|\\dist\\|\\build\\|\\coverage\\|\\out\\'
}
$stats.FilesScanned=$files.Count
foreach($file in $files){
 $text=Get-Content $file.FullName -Raw -Encoding UTF8
 $rx='(?ms)^(?<imp>\s*import\b.*?})\s*\r?\n\s*from\s+(?<mod>["''][^"'']+["'']\s*;?)'
 $m=[regex]::Matches($text,$rx)
 if($m.Count){
   $stats.Findings+=$m.Count
   W ("{0}: {1} split import(s)" -f $file.FullName,$m.Count)
   if($Repair){
     $new=$text
     foreach($x in @($m)|Sort-Object Index -Descending){
       $rep="{0} from {1}" -f $x.Groups['imp'].Value.TrimEnd(),$x.Groups['mod'].Value
       $new=$new.Remove($x.Index,$x.Length).Insert($x.Index,$rep)
       $stats.ImportsRepaired++
     }
     if($new-ne$text){
       if($PSCmdlet.ShouldProcess($file.FullName,"Repair split imports")){
         Set-Content $file.FullName $new -Encoding UTF8
         $stats.FilesModified++
       }
     }
   }
 }
}
Write-Host "==== Repository Import Recovery Report ===="
$stats.GetEnumerator()|%{Write-Host ("{0,-18}: {1}"-f $_.Key,$_.Value)}
if($stats.Findings -eq 0){P "No split imports detected."}
elseif($Repair){P "Recovery completed."}
else{W "Run with -Repair (or -Repair -WhatIf first)."}
