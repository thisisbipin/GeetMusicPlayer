import http.server
from os import confstr, system
import socketserver


def main(open):
    PORT = 8000
    Handler = http.server.SimpleHTTPRequestHandler
    if(open != None):
        system(str(open) + " http://localhost:"+str(PORT))
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("App is serving at port", PORT)
        print("Open http://localhost:"+str(PORT))
        httpd.serve_forever()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--open', metavar='path',
                        required=False)
    args = parser.parse_args()
    main(open=args.open)
