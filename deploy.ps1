# Build แล้ว push โฟลเดอร์ out/ ไปสาขา gh-pages (สำหรับ GitHub Pages แบบ branch)
# ใช้เมื่อบัญชี GitHub ยังรัน GitHub Actions ไม่ได้ หรืออยาก deploy เอง
$ErrorActionPreference = "Stop"

$base = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $base

if (-not $env:NEXT_PUBLIC_BASE_PATH) {
  $env:NEXT_PUBLIC_BASE_PATH = "/database-midterm"
}

Write-Host "==> npm run build (basePath=$env:NEXT_PUBLIC_BASE_PATH)"
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

$tmp = Join-Path $env:TEMP "gh-pages-deploy"
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }

Write-Host "==> preparing gh-pages branch"
git worktree add --detach $tmp origin/gh-pages 2>$null
if (-not (Test-Path $tmp)) {
  # สร้างสาขาใหม่ถ้ายังไม่มี
  git branch gh-pages 2>$null
  git worktree add --detach $tmp gh-pages
}

git -C $tmp rm -r -q --cached . 2>$null | Out-Null
git -C $tmp clean -fdq 2>$null | Out-Null
Get-ChildItem $tmp -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
Copy-Item -Recurse -Force "out\*" $tmp
Set-Content -Path "$tmp\.nojekyll" -Value "" -Encoding ASCII

git -C $tmp add -A
git -C $tmp commit -q -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git -C $tmp push origin $($(git -C $tmp branch --show-current) + ":gh-pages")
git worktree remove $tmp --force

Write-Host "==> deployed to https://chalanon.github.io/database-midterm/"
