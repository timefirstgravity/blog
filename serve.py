#!/usr/bin/env python3
"""
Minimal, robust development server
"""

import http.server
import socketserver
import signal
import sys

PORT = 8000

class ReuseAddrTCPServer(socketserver.TCPServer):
    allow_reuse_address = True
    allow_reuse_port = True

def signal_handler(sig, frame):
    print('\n\nShutting down server...')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

Handler = http.server.SimpleHTTPRequestHandler

print(f"Server running at http://localhost:{PORT}/")
print("Press Ctrl+C to stop\n")

with ReuseAddrTCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()