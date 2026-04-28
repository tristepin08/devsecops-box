import React, { useState } from 'react';

// 🚨 FAILLE 1 : Secrets en dur (Pour réveiller Gitleaks)
// On laisse traîner une fausse clé AWS et un faux jeton d'API en plein milieu du code.
const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";
const ADMIN_PASSWORD = "SuperSecretPassword123!";

function App() {
  const [userInput, setUserInput] = useState("<h1>Titre inoffensif</h1>");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const executeDangerousAction = () => {
    // 🚨 FAILLE 2 : Utilisation de eval() (Pour réveiller Semgrep)
    // eval() permet d'exécuter n'importe quel texte comme du code JavaScript. C'est interdit !
    eval("console.log('Ceci est une faille critique !')");
  };

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Crash Test DevSecOps - React</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>1. Faille XSS (Cross-Site Scripting)</h2>
        <p>Tapez un script ici (ex: <code>&lt;img src=x onerror=alert('Piraté!')&gt;</code>) :</p>
        <input 
          type="text" 
          style={{ width: "300px", padding: "10px" }}
          onChange={handleInputChange} 
          placeholder="Injectez du code ici..." 
        />
        
        {/* 🚨 FAILLE 3 : dangerouslySetInnerHTML (Pour réveiller Semgrep)
            C'est la porte grande ouverte aux attaques XSS. React prévient avec ce nom explicite, 
            mais Semgrep va le détecter comme une erreur grave si ce n'est pas sécurisé. */}
        <div 
          style={{ border: "2px solid red", marginTop: "10px", padding: "10px" }}
          dangerouslySetInnerHTML={{ __html: userInput }} 
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>2. Faille de redirection (Reverse Tabnabbing)</h2>
        {/* 🚨 FAILLE 4 : Lien externe sans protection (Pour réveiller Semgrep)
            Un target="_blank" sans rel="noreferrer noopener" permet au site de destination 
            de prendre le contrôle de l'onglet précédent via JavaScript. */}
        <a href="http://site-malveillant-exemple.com" target="_blank">
          Cliquez ici pour réclamer votre prix !
        </a>
      </section>

      <section>
        <h2>3. Exécution dynamique</h2>
        <button onClick={executeDangerousAction} style={{ padding: "10px", background: "red", color: "white" }}>
          Lancer l'action dangereuse
        </button>
      </section>
    </div>
  );
}

export default App;