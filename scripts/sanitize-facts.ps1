$files = Get-ChildItem "E:\Main\Code\lakreet\documentation\docs-site\internal\facts" -File
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace "C:\\\\Users\\\\[^\\\\]+", "C:\Users\<you>"
    Set-Content -Encoding utf8 $file.FullName $content
}
Write-Host "Sanitized personal paths"