<#
  从 yaofang.txt 生成 cloudfunctions/analyzeReport/herbalKnowledge.js
  - 自动识别 UTF-8/GBK
  - 每段：性别+年龄+诉求+药材列表 → 作为一个处方条目
  - 处方 id 使用英文诉求 key + 序号；保留 herb.effect 以便前端展示
#>

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root 'yaofang.txt'
$out  = Join-Path $root 'cloudfunctions/analyzeReport/herbalKnowledge.js'

if (-not (Test-Path $src)) { Write-Error "missing $src" }

function Read-TextSmart([string]$path) {
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $utf8 = [System.Text.Encoding]::UTF8.GetString($bytes)
  if ($utf8.Contains([char]0xFFFD)) {
    $gbk = [System.Text.Encoding]::GetEncoding(936).GetString($bytes)
    if (-not $gbk.Contains([char]0xFFFD)) { return $gbk }
  }
  return $utf8
}

function Split-Blocks([string]$text) {
  $re = '(\u7537|\u5973)[^\n]{0,20}?\d{1,3}\s*\u5C81'
  $matches = [regex]::Matches($text, $re)
  if ($matches.Count -eq 0) { return @($text) }
  $blocks = @()
  for ($i=0; $i -lt $matches.Count; $i++) {
    $from = $matches[$i].Index
    $to = if ($i + 1 -lt $matches.Count) { $matches[$i+1].Index } else { $text.Length }
    $chunk = $text.Substring($from, ($to - $from)).Trim()
    if ($chunk) { $blocks += ,$chunk }
  }
  return ,$blocks
}

function Parse-Header([string]$chunk) {
  $re = '^(\u7537|\u5973)[^\d]{0,10}?(\d{1,3})[^\S\n\r,;:：，；]*\u5C81?[^\S\n\r]*([^,;:：，；\n\r]{1,30})?'
  $m = [regex]::Match($chunk, $re)
  if (-not $m.Success) { return @{ appeal=$null; headerLength=0 } }
  $appeal = if ($m.Groups[3].Success) { $m.Groups[3].Value.Trim() } else { $null }
  return @{ appeal=$appeal; headerLength=$m.Length }
}

function Parse-Herbs([string]$chunk, [int]$startIdx) {
  $tail = if ($startIdx -gt 0 -and $startIdx -lt $chunk.Length) { $chunk.Substring($startIdx) } else { $chunk }
  $entries = ($tail -split '[\uFF1B;\r\n]+' | ForEach-Object { $_.Trim() }) | Where-Object { $_ -ne '' }
  $list = @()
  foreach ($entry in $entries) {
    $m = [regex]::Match($entry, '^([\p{IsCJKUnifiedIdeographs}A-Za-z·\uFF08\uFF09()]+)\s*(\d{1,3})?\s*(g|G|\u514B)?\s*(.*)$')
    if (-not $m.Success) { continue }
    $name = ($m.Groups[1].Value -replace '[\uFF08\uFF09()]','').Trim()
    if (-not $name) { continue }
    $amount = if ($m.Groups[2].Success) { [int]$m.Groups[2].Value } else { $null }
    $unit = if ($m.Groups[3].Success -or $amount) { 'g' } else { $null }
    $effect = ($m.Groups[4].Value -replace '^[,;:：，；、\s]+','').Trim()
    $obj = [ordered]@{ name=$name; amount=$amount; unit=$unit; effect=$effect }
    $list += ,$obj
  }
  return ,$list
}

function Appeal-Key([string]$appeal) {
  if (-not $appeal) { return 'appeal_general' }
  if ($appeal -match "\u964d\u8840\u538b") { return 'appeal_lower_bp' }
  if ($appeal -match "\u964d\u8840\u7cd6") { return 'appeal_lower_glucose' }
  if ($appeal -match "(\u5fc3\u810f|\u5fc3)") { return 'appeal_heart' }
  if ($appeal -match "(\u5173\u8282|\u9aa8|\u7b4b)") { return 'appeal_joint_bone' }
  if ($appeal -match "(\u75b2|\u7d2f|\u63d0\u795e)") { return 'appeal_anti_fatigue' }
  if ($appeal -match "\u8bb0\u5fc6") { return 'appeal_memory' }
  if ($appeal -match "\u524d\u5217\u817a") { return 'appeal_prostate' }
  if ($appeal -match "\u514d\u75ab") { return 'appeal_immunity' }
  if ($appeal -match "(\u8c03\u7406.*\u809d|\u809d\u529f|\u62a4\u809d)") { return 'appeal_liver' }
  if ($appeal -match "\u589e\u808c") { return 'appeal_muscle' }
  if ($appeal -match "\u7761\u7720") { return 'appeal_sleep' }
  if ($appeal -match "(\u6708\u7ecf|\u75db\u7ecf)") { return 'appeal_menses' }
  if ($appeal -match "\u66f4\u5e74\u671f") { return 'appeal_menopause' }
  if ($appeal -match "(\u51cf\u80a5|\u7f8e\u4f53)") { return 'appeal_weight_loss' }
  if ($appeal -match "(\u76ae\u80a4|\u7f8e\u767d|\u7f8e\u5bb9)") { return 'appeal_skin' }
  if ($appeal -match "(\u9aa8\u8d28|\u758f\u677e)") { return 'appeal_anti_osteoporosis' }
  return 'appeal_general'
}

$text = Read-TextSmart $src
$blocks = Split-Blocks $text

$prescriptions = [ordered]@{}
for ($i=0; $i -lt $blocks.Count; $i++) {
  $chunk = $blocks[$i]
  $h = Parse-Header $chunk
  $appeal = $h['appeal']
  $key = Appeal-Key $appeal
  $herbs = Parse-Herbs -chunk $chunk -startIdx $h['headerLength']
  $pid = "${key}_${($i+1).ToString('00')}"
$name = if ($appeal) { "Case Formula - $appeal" } else { "Case Formula - ${($i+1)}" }
  $prescriptions[$pid] = [ordered]@{
    id = $pid
    name = $name
    category = '案例药方'
    herbs = $herbs
    dosage = '每日1剂，水煎300-400ml分早晚服'
    duration = '14天为一疗程，根据效果调整'
    precautions = @('For reference only; follow TCM physician guidance')
    contraindications = @('Pregnancy/breastfeeding: consult physician before use')
  }
}

$header = @'
/**
 * Herbal knowledge generated from yaofang.txt (auto-generated)
 * This file is overwritten by scripts/generate-knowledge-from-yaofang.ps1
 */
'@

$body = "const PRESCRIPTIONS = " + ($prescriptions | ConvertTo-Json -Depth 8) + ";`n`nconst HERB_INFO = {};`n`nmodule.exports = { PRESCRIPTIONS, HERB_INFO };`n"

New-Item -Path (Split-Path $out -Parent) -ItemType Directory -Force | Out-Null
Set-Content -Path $out -Value ($header + $body) -Encoding UTF8

Write-Host "herbalKnowledge.js generated with $($prescriptions.Keys.Count) prescriptions -> $(Resolve-Path $out)"
