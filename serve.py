#!/usr/bin/env python3
"""
Simple web server for local development of the Time-First Gravity Blog
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent.absolute()

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"═══════════════════════════════════════════")
        print(f"   Time-First Gravity Blog Server")
        print(f"═══════════════════════════════════════════")
        print(f"")
        print(f"   Serving at: http://localhost:{PORT}")
        print(f"   Directory:  {DIRECTORY}")
        print(f"")
        print(f"   Press Ctrl+C to stop the server")
        print(f"═══════════════════════════════════════════")
        print(f"")
        
        # Optionally open browser
        try:
            webbrowser.open(f'http://localhost:{PORT}')
            print(f"Browser opened automatically.")
        except:
            print(f"Please open http://localhost:{PORT} in your browser.")
        
        print(f"\nServer logs:")
        print(f"────────────────────────────────────────")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n────────────────────────────────────────")
            print(f"Server stopped.")
            return 0

if __name__ == "__main__":
    exit(main())