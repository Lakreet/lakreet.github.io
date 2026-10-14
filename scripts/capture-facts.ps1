$repo = "E:\Main\Code\lakreet\lakreet-swarm"
$out  = "E:\Main\Code\lakreet\documentation\docs-site\internal\facts"
New-Item -ItemType Directory -Force $out | Out-Null
Set-Location $repo

# Help for the root command and each subcommand
$subcommands = @("render", "check", "inspect", "init", "preview", "doctor")
& node src/cli.js --help 2>&1 | Out-File -Encoding utf8 "$out\help.txt"
foreach ($c in $subcommands) {
  & node src/cli.js $c --help 2>&1 | Out-File -Encoding utf8 "$out\help-$c.txt"
}

# Version, environment and compatibility
& node src/cli.js --version 2>&1 | Out-File -Encoding utf8 "$out\version.txt"
& node src/cli.js doctor 2>&1 | Out-File -Encoding utf8 "$out\doctor.txt"
Copy-Item compat.json "$out\compat.json" -Force
Copy-Item package.json "$out\package.json" -Force

# Real examples
& node src/cli.js inspect examples/title2.ectemplate 2>&1 | Out-File -Encoding utf8 "$out\example-inspect.txt"
& node src/cli.js check --template examples/title2.ectemplate --data examples/data.csv 2>&1 | Out-File -Encoding utf8 "$out\example-check.txt"
& node src/cli.js init --template examples/title2.ectemplate --out "$env:TEMP\starter.csv" --force 2>&1 | Out-File -Encoding utf8 "$out\example-init.txt"
Get-Content "$env:TEMP\starter.csv" | Out-File -Encoding utf8 "$out\example-init-result.csv"

# One real render with the machine-readable event stream and the report
& node src/cli.js render --template examples/title2.ectemplate --data examples/data.csv --out "$env:TEMP\facts-out" --json 2>&1 | Out-File -Encoding utf8 "$out\example-render-events.ndjson"
Copy-Item "$env:TEMP\facts-out\report.json" "$out\example-report.json" -Force
Copy-Item "$env:TEMP\facts-out\report.csv" "$out\example-report.csv" -Force

Write-Host "Facts saved to $out"