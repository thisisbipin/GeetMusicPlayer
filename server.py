import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("App is serving at port", PORT)
    print("Open http://localhost:"+str(PORT))
    httpd.serve_forever()
