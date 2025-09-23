#!/usr/bin/env python3
"""
Minimal, robust development server
"""

import http.server
import socketserver
import signal
import sys
import socket

PORT = 8000

class QuietHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler with suppressed broken pipe errors"""

    def handle(self):
        try:
            super().handle()
        except (BrokenPipeError, ConnectionResetError, socket.error) as e:
            # Silently ignore broken pipe and connection reset errors
            pass

    def log_error(self, format, *args):
        # Only log errors that aren't broken pipe related
        if "Broken pipe" not in format % args:
            super().log_error(format, *args)

class ReuseAddrTCPServer(socketserver.TCPServer):
    allow_reuse_address = True
    allow_reuse_port = True

def signal_handler(sig, frame):
    print('\n\nShutting down server...')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

Handler = QuietHTTPRequestHandler

print(f"Server running at http://localhost:{PORT}/")
print("Press Ctrl+C to stop\n")

with ReuseAddrTCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()