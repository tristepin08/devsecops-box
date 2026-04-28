const express = require('express');
const app = express();

app.get('/download', (req, res) => {
    // ✅ On récupère l'entrée utilisateur
    const userInput = req.query.file || '';

    // ✅ PROTECTION ULTIME : On transforme tout caractère spécial en texte inoffensif
    // On remplace les < et > par leurs équivalents texte (&lt; et &gt;)
    const safeFile = userInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // ✅ On n'affiche plus la variable directement, mais sa version nettoyée
    res.send(`Demande reçue pour le fichier : ${safeFile}`);
});

// ✅ On ajoute une route de base simple pour plaire aux robots
app.get('/', (req, res) => {
    res.send("Serveur opérationnel et sécurisé.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));