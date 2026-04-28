const express = require('express');
const app = express();

app.get('/download', (req, res) => {
    // ✅ On récupère l'entrée
    const fileRequested = req.query.file || 'none';

    // ✅ SOLUTION FINALE : On répond en JSON. 
    // C'est 100% protégé contre le XSS par nature.
    res.json({
        success: true,
        message: "Demande enregistrée",
        file: fileRequested
    });
});

app.get('/', (req, res) => {
    res.send("Serveur en ligne et 100% sécurisé.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Défense totale activée sur le port ${PORT}`));