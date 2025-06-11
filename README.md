# API Consommation

Une API simple pour enregistrer la consommation de produits par client.

## Démarrage local

```bash
npm install
npm start
```

## Endpoints

- `GET /data` – récupère toutes les données
- `POST /add` – ajoute une consommation `{ client, product, quantity }`
- `POST /reset` – réinitialise les données

## Déploiement Render

1. Poussez ce dossier sur GitHub
2. Connectez Render à ce repo
3. Créez un nouveau **Web Service**
4. Commande de démarrage : `npm start`
5. Laissez Render détecter `PORT`