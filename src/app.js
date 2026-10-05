const express = require('express');
const app = express();

// FAILLE 1 : Secret en dur (Hardcoded credentials)
const dbPassword = "SuperSecretPassword123!";
const awsAccessKey = "AKIAIOSFODNN7EXAMPLE";

app.get('/user', function(req, res) {
    // FAILLE 2 : Vulnérabilité d'Injection SQL (Concaténation non sécurisée)
    let userId = req.query.id;
    let query = "SELECT * FROM users WHERE id = " + userId; 
    
    res.send("Exécution de la requête : " + query);
});

app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));