# Read .env file and set environment variables
foreach ($line in Get-Content .env) {
    $line = $line.Trim()
    if (-not [string]::IsNullOrWhiteSpace($line) -and $line -match '^([^=]+)=(.*)$') {
        $envName = $Matches[1]
        $envValue = $Matches[2]
        [System.Environment]::SetEnvironmentVariable($envName, $envValue, 'Process')
    }
}

# Run npm ci
try {
    npm ci --loglevel verbose
} catch {
    $errorMessage = "Error running 'npm ci': $_"
    Write-Error $errorMessage
    exit 1
}