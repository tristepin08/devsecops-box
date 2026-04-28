const express = require('express');
const { exec } = require('child_process');
const app = express();

// 🚨 Faille 1 : Un vrai (faux) token Slack. Gitleaks connaît cette signature par cœur.
const SLACK_BOT_TOKEN = "fake-123456789012-1234567890123-abcdef0123456789abcdef01";

app.get('/download', (req, res) => {
    // 🚨 Faille 2 : Remote Code Execution (RCE)
    // Ici, on laisse l'utilisateur envoyer n'importe quoi dans req.query.file, 
    // et on l'exécute directement sur le serveur. C'est la pire faille existante.
    let file = req.query.file;
    exec("cat " + file, (err, data) => {
        if(err) { res.send("Erreur"); return; }
        res.send(data);
    });
});

app.listen(3000, () => console.log('Serveur lancé'));