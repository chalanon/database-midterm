# Build แล้ว push โฟลเดอร์ out/ ไปสาขา gh-pages (สำหรับ GitHub Pages แบบ branch)
# ใช้เมื่อบัญชี GitHub ยังรัน GitHub Actions ไม่ได้ หรืออยาก deploy เอง
# วิธีใช้: เปิด PowerShell แล้วรัน  .\deploy.ps1

$base = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $base

if (-not $env:NEXT_PUBLIC_BASE_PATH) {
  $env:NEXT_PUBLIC_BASE_PATH = "/database-midterm"
}

function Assert-Ok($label) {
  if ($LASTEXITCODE -ne 0) { throw "$label failed (exit $LASTEXITCODE)" }
}

Write-Host "==> npm run build (basePath=$env:NEXT_PUBLIC_BASE_PATH)"
$log = Join-Path $env:TEMP "db-build.log"
& npm run build 2> $log
if ($LASTEXITCODE -ne 0) {
  if (Test-Path $log) { Get-Content $log }
  throw "npm run build failed (exit $LASTEXITCODE)"
}
if (Test-Path $log) { Remove-Item -Force $log }

$tmp = Join-Path $env:TEMP "gh-pages-deploy"
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }

Write-Host "==> preparing gh-pages branch"
git worktree prune 2>&1 | Out-Null
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
git fetch origin gh-pages 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { git branch gh-pages 2>&1 | Out-Null }
git worktree add --detach $tmp origin/gh-pages 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
  git worktree add --detach $tmp gh-pages 2>&1 | Out-Null
  Assert-Ok "git worktree add"
}

git -C $tmp rm -r -q --cached . 2>&1 | Out-Null
git -C $tmp clean -fdq 2>&1 | Out-Null
Get-ChildItem $tmp -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
Copy-Item -Recurse -Force "out\*" $tmp
Set-Content -Path "$tmp\.nojekyll" -Value "" -Encoding ASCII

git -C $tmp add -A 2>&1 | Out-Null
git -C $tmp commit -q -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
Assert-Ok "git commit"
git -C $tmp push origin "HEAD:gh-pages" 2>&1 | Out-Null
Assert-Ok "git push gh-pages"
git worktree remove $tmp --force 2>&1 | Out-Null

Write-Host "==> deployed: https://chalanon.github.io/database-midterm/"
Write-Host "    (อาจใช้เวลา 1-3 นาทีให้ Pages สร้าง ถ้าบัญชียัง lock billing อยู่จะไม่ขึ้น จนกว่าจะแก้ที่ github.com/settings/billing)"

