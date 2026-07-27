$repo = "C:\Users\SAMPC\.openclaw\workspace-website-architect\life-system-os-clone"

Write-Host "=== FIX 1: index.html stat-card IDs ==="
$indexPath = Join-Path $repo "index.html"
$idxContent = Get-Content -Raw -LiteralPath $indexPath

# Add id="stat-articles" to the "Articles & Guides" stat card
$idxContent = $idxContent -replace '<div class="stat-card">(?=<div class="stat-number">358\+</div><div class="stat-label">Articles & Guides</div>)', '<div class="stat-card" id="stat-articles">'

# Add id="stat-categories" to the "Topic Categories" stat card
$idxContent = $idxContent -replace '<div class="stat-card">(?=<div class="stat-number">5</div><div class="stat-label">Topic Categories</div>)', '<div class="stat-card" id="stat-categories">'

# Add id="stat-articles-2" to the "Up-to-Date Guides" stat card
$idxContent = $idxContent -replace '<div class="stat-card">(?=<div class="stat-number">358\+</div><div class="stat-label">Up-to-Date Guides</div>)', '<div class="stat-card" id="stat-articles-2">'

[System.IO.File]::WriteAllText($indexPath, $idxContent, [System.Text.UTF8Encoding]::new($false))
Write-Host "  index.html updated with stat-card IDs"

Write-Host ""
Write-Host "=== FIX 2: Remove duplicate title after stylesheet link ==="
$htmlFiles = Get-ChildItem $repo -Filter "*.html" -Exclude "index.html"
$fix2count = 0
foreach ($f in $htmlFiles) {
    $content = Get-Content -Raw -LiteralPath $f.FullName
    if ($content -match 'rel="stylesheet"><meta charset="UTF-8"><title>.*?</title>') {
        $content = $content -replace 'rel="stylesheet"><meta charset="UTF-8"><title>.*?</title>', 'rel="stylesheet">'
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $fix2count++
        Write-Host "  Fixed: $($f.Name)"
    }
}
if ($fix2count -eq 0) { Write-Host "  No files needed Fix 2" }

Write-Host ""
Write-Host "=== FIX 3: Remove stale &#x97; GA4 comment ==="
$allHtmlFiles = Get-ChildItem $repo -Filter "*.html"
$fix3count = 0
foreach ($f in $allHtmlFiles) {
    $content = Get-Content -Raw -LiteralPath $f.FullName
    $origLen = $content.Length
    # Remove the entire line containing the GA4 &#x97; comment
    $content = $content -replace '<!-- GA4 &#x97; REPLACE G-8CVE2X8R5L with real measurement ID -->\r?\n?', ''
    if ($content.Length -ne $origLen) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $fix3count++
        Write-Host "  Fixed: $($f.Name)"
    }
}
if ($fix3count -eq 0) { Write-Host "  No files needed Fix 3" }

Write-Host ""
Write-Host "=== Verification ==="
# Verify Fix 1
$vIdx = Get-Content -Raw -LiteralPath $indexPath
$hasArticles = $vIdx.Contains('id="stat-articles"')
$hasCategories = $vIdx.Contains('id="stat-categories"')
$hasArticles2 = $vIdx.Contains('id="stat-articles-2"')
Write-Host "  Fix 1 verify:"
Write-Host "    stat-articles=$hasArticles"
Write-Host "    stat-categories=$hasCategories"
Write-Host "    stat-articles-2=$hasArticles2"

# Verify Fix 2 - check first non-index file
$sample = Get-ChildItem $repo -Filter "*.html" -Exclude "index.html" | Select-Object -First 1
if ($sample) {
    $v2 = Get-Content -Raw -LiteralPath $sample.FullName
    $dupTitle = $v2 -match 'rel="stylesheet"><meta charset="UTF-8"><title>'
    Write-Host "  Fix 2 verify (sample $($sample.Name)):"
    Write-Host "    dupTitleFound=$dupTitle"
}

# Verify Fix 3
$v3 = Get-Content -Raw -LiteralPath $sample.FullName
$staleComment = $v3.Contains('&#x97;')
Write-Host "  Fix 3 verify (sample):"
Write-Host "    staleCommentFound=$staleComment"

Write-Host ""
Write-Host "=== Fix Summary ==="
Write-Host "  Fix 1: stat-card IDs added to index.html"
Write-Host "  Fix 2: $fix2count files had duplicate titles removed"
Write-Host "  Fix 3: $fix3count files had stale GA4 comments removed"
Write-Host ""
Write-Host "=== All fixes applied ==="
