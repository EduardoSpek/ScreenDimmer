#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor local para visualizar a Landing Page do ScreenDimmer
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    print("=" * 50)
    print("🌙 ScreenDimmer - Landing Page Server")
    print("=" * 50)
    print(f"\n📁 Servindo arquivos de: {DIRECTORY}")
    print(f"🌐 Acesse: http://localhost:{PORT}")
    print(f"\n⏳ Iniciando servidor na porta {PORT}...")
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("✅ Servidor iniciado com sucesso!")
            print("\n🚀 Abrindo navegador automaticamente...")
            webbrowser.open(f"http://localhost:{PORT}")
            print("\n💡 Pressione CTRL+C para parar o servidor\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor encerrado.")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n⚠️ Porta {PORT} já está em uso.")
            print(f"🌐 Tentando abrir o navegador mesmo assim...")
            webbrowser.open(f"http://localhost:{PORT}")
        else:
            raise
