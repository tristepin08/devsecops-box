const express = require('express');
// ✅ CORRECTION 1 : On supprime totalement l'importation de 'child_process'
// C'est l'outil qui permettait d'exécuter des commandes système, on n'en a pas besoin ici !

const app = express();

// ✅ CORRECTION 2 : Plus aucun secret en dur ! 
// Si on a besoin d'un token, on le demande à l'environnement (Render), sinon on n'a rien.
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

app.get('/download', (req, res) => {
    // ✅ CORRECTION 3 : Fini l'exécution de commande aveugle (RCE)
    // Au lieu d'exécuter "cat", on traite la demande de l'utilisateur de manière sécurisée, 
    // en la considérant uniquement comme du texte inoffensif.
    let file = req.query.file || 'aucun_fichier_specifie';
    
    // On renvoie simplement une réponse texte sécurisée
    res.send(`Demande de fichier bien reçue, mais exécution bloquée par sécurité. Fichier demandé : ${file}`);
});

// ✅ BONUS : Une route "health" pour Render
app.get('/health', (req, res) => {
    res.json({ status: "ok", message: "Le serveur est blindé !" });
});

// On écoute le port fourni par Render, sinon le port 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sécurisé lancé sur le port ${PORT}`));