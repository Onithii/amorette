# Simple HTTP Server using TcpListener
param([int]$Port = 8080, [string]$Path = ".")

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()
Write-Host "Server running at http://127.0.0.1:$Port/ from $Path"

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        [System.Threading.ThreadPool]::QueueUserWorkItem({
            param($c)
            try {
                $stream = $c.GetStream()
                $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII)
                $requestLine = $reader.ReadLine()
                if (-not $requestLine) { $c.Close(); return }

                $parts = $requestLine.Split(" ")
                $url = if ($parts.Length -gt 1) { $parts[1].Split("?")[0] } else { "/" }
                if ($url -eq "/" -or $url -eq "") { $url = "/index.html" }

                $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($using:Path, $url.TrimStart("/").Replace("/", "\")))
                if (-not $filePath.StartsWith([System.IO.Path]::GetFullPath($using:Path))) {
                    $res = "HTTP/1.1 403 Forbidden`r`nContent-Length: 0`r`n`r`n"
                    $bytes = [System.Text.Encoding]::ASCII.GetBytes($res)
                    $stream.Write($bytes, 0, $bytes.Length)
                    $c.Close()
                    return
                }

                if ([System.IO.File]::Exists($filePath)) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = switch ($ext) {
                        ".html" { "text/html; charset=utf-8" }
                        ".css"  { "text/css; charset=utf-8" }
                        ".js"   { "application/javascript; charset=utf-8" }
                        ".svg"  { "image/svg+xml" }
                        ".json" { "application/json" }
                        ".png"  { "image/png" }
                        ".jpg"  { "image/jpeg" }
                        Default { "application/octet-stream" }
                    }
                    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($fileBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $hBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($hBytes, 0, $hBytes.Length)
                    $stream.Write($fileBytes, 0, $fileBytes.Length)
                } else {
                    $res = "HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`n`r`nNot Found"
                    $bytes = [System.Text.Encoding]::ASCII.GetBytes($res)
                    $stream.Write($bytes, 0, $bytes.Length)
                }
                $stream.Flush()
                $c.Close()
            } catch {
                if ($c) { $c.Close() }
            }
        }, $client) | Out-Null
    }
} finally {
    $listener.Stop()
}
