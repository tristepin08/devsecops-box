GUIDE DE SÉCURITÉ : PIPELINE DEVSECOPS
Ce document est la référence pour tout développeur travaillant sur ce projet. Notre pipeline de déploiement automatique inclut des barrages de sécurité (Quality Gates). Si votre code ne respecte pas ces règles, il ne sera jamais déployé sur Render.

1. Pourquoi mon déploiement a échoué ?
Si vous voyez une croix rouge (X) dans l'onglet "Actions" sur GitHub, le déploiement a été stoppé. Les causes principales sont :

Fuite de secrets : Vous avez laissé une clé API, un mot de passe ou un token en clair dans le code.

Faille de sécurité : Vous avez utilisé une fonction dangereuse (ex: eval(), exec(), ou une injection HTML brute).

Dépendance vulnérable : Une bibliothèque dans votre package.json possède une faille critique connue.

2. Les Règles d'Or du Développeur
 Gestion des Secrets
INTERDIT : const API_KEY = "12345...";

AUTORISÉ : const API_KEY = process.env.API_KEY;


🔍 Analyse de Code (Semgrep)
Si Semgrep bloque une ligne mais que vous estimez que c'est un "faux positif", vous pouvez forcer le passage avec ce commentaire :
// nosemgrep: nom.de.la.regle (À utiliser avec parcimonie !).

Dépendances
Avant de push, lancez toujours un npm audit sur votre machine pour vérifier que vos bibliothèques sont à jour.

3. Procédure de Correction
Allez dans GitHub > Actions.

Cliquez sur le build en rouge pour voir quel outil a détecté l'erreur.

Lisez le message d'erreur : il indique souvent le fichier et la ligne exacte.

Corrigez, faites un nouveau commit et push.