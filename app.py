from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/')
def home():
    # 🚨 Faille critique : on laisse l'utilisateur taper une commande système !
    cmd = request.args.get('cmd')
    os.system(cmd) 
    return "Test du pipeline en cours..."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)