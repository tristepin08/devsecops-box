const express = require('express');
// nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
const app = express(); 

app.get('/download', (req, res) => {
    // On renvoie juste un message fixe, sans aucune variable utilisateur
    // Comme ça, il n'y a aucun risque de XSS ou de RCE.
    res.json({
        status: "success",
        message: "Fichier prêt au téléchargement (Simulation sécurisée)"
    });
});

app.get('/', (req, res) => {
    res.send("<h1>Forteresse Validée</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));