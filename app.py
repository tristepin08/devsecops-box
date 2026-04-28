from weasyprint import HTML
import os

# Contenu du manuel en HTML/CSS
html_content = """
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 20mm;
            background-color: #f4f7f9;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .header {
            background-color: #1a2a6c;
            color: white;
            padding: 30px;
            text-align: center;
            border-bottom: 5px solid #f27121;
        }
        h1 { margin: 0; font-size: 24pt; }
        h2 { color: #1a2a6c; border-left: 5px solid #f27121; padding-left: 10px; margin-top: 30px; font-size: 16pt; }
        h3 { color: #b21f1f; font-size: 13pt; }
        .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .badge { display: inline-block; padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 0.9em; margin-bottom: 10px; }
        .badge-red { background-color: #ff4b2b; color: white; }
        .badge-blue { background-color: #1a2a6c; color: white; }
        code { background-color: #eee; padding: 2px 5px; border-radius: 4px; font-family: monospace; }
        .footer { text-align: center; font-size: 9pt; color: #777; margin-top: 40px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        .warning-box { background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Guide de Gouvernance DevSecOps</h1>
        <p>Protocole de déploiement et standards de sécurité applicative</p>
    </div>

    <div class="section">
        <h2>1. Philosophie du Pipeline</h2>
        <p>Notre infrastructure utilise une approche <strong>"Security by Design"</strong>. Tout code poussé sur la branche principale est soumis à une batterie de tests automatiques. Le déploiement vers <strong>Render</strong> est conditionné par la validation de tous les scanners de sécurité.</p>
    </div>

    <div class="section">
        <h2>2. Les "Security Gates" (Barrages de sécurité)</h2>
        
        <h3>🛡️ Gitleaks (Protection des Secrets)</h3>
        <p>Analyse chaque commit à la recherche de clés API, mots de passe ou tokens AWS/Slack en clair.</p>
        <ul>
            <li><strong>Action :</strong> Ne jamais stocker de secrets dans le code. Utilisez les variables d'environnement.</li>
            <li><strong>En cas d'échec :</strong> Le build s'arrête immédiatement. Vous devez nettoyer l'historique Git ou révoquer la clé compromise.</li>
        </ul>

        <h3>🔍 Semgrep (Analyse Statique - SAST)</h3>
        <p>Vérifie la logique du code (XSS, Injection SQL, RCE, CSRF).</p>
        <ul>
            <li><strong>Règle :</strong> Le code doit respecter les standards du dictionnaire <code>p/default</code>.</li>
            <li><strong>Exception :</strong> Pour ignorer une alerte justifiée (faux positif), utilisez <code>// nosemgrep: id-de-la-regle</code>.</li>
        </ul>

        <h3>📦 Trivy & npm audit (Dépendances)</h3>
        <p>Scanne les vulnérabilités connues (CVE) dans les bibliothèques externes (package.json).</p>
    </div>

    <div class="section">
        <h2>3. Procédure en cas de Build Rouge 🔴</h2>
        <p>Si GitHub Actions affiche une croix rouge :</p>
        <ol>
            <li>Consultez les logs de l'étape en échec dans l'onglet <strong>Actions</strong>.</li>
            <li>Identifiez la ligne de code incriminée.</li>
            <li>Corrigez la faille ou la fuite de secret.</li>
            <li>Refaites un <code>git push</code>. <strong>Le déploiement Render ne se déclenchera pas tant que le rouge persiste.</strong></li>
        </ol>
    </div>

    <div class="warning-box">
        <strong>Rappel Important :</strong> Le "Deploy Hook" de Render est un secret protégé. Ne modifiez jamais les workflows GitHub sans l'accord de l'administrateur sécurité.
    </div>

    <div class="footer">
        Document généré pour l'équipe de développement • Version 1.0 • Sécurité Automatisée
    </div>
</body>
</html>
"""

# Génération du PDF
output_pdf = "Manuel_DevSecOps_Dev.pdf"
HTML(string=html_content).write_pdf(output_pdf)

print(f"Fichier généré : {output_pdf}")