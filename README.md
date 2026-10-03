# SunuAI — version fonctionnelle

## Ce qui est prêt
- Site responsive
- Interface de chat
- Serveur Node.js sécurisé
- Endpoint `/api/chat`
- Clé API conservée côté serveur
- Instructions de comportement SunuAI
- Français, Wolof et arabe pris en charge au niveau des instructions

## Installation
1. Installer Node.js.
2. Ouvrir ce dossier dans un terminal.
3. Exécuter `npm install`.
4. Copier `.env.example` vers `.env`.
5. Ajouter votre clé API dans `.env`.
6. Exécuter `npm start`.
7. Ouvrir `http://localhost:3000`.

## Sécurité
Ne mettez jamais `OPENAI_API_KEY` dans `index.html`, `script.js` ou un dépôt public. Le fichier `.env` est ignoré par Git.

La connexion utilise la Responses API, recommandée pour les nouvelles intégrations.
