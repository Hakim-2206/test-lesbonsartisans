# CRUD APP - Les Bons Artisans

Cette application est une solution complète de gestion de produits avec un backend Node.js/Express connecté à une base
MongoDB. Elle propose une interface utilisateur moderne en React avec Material UI, permettant de consulter, créer,
modifier et supprimer des produits. Le projet comprend également des fonctionnalités de mise à jour en temps réel via
WebSocket et une gestion sécurisée via authentification.

---

## Vidéo de présentation

Présentation vidéo expliquant le lancement du projet en local et ses fonctionnalités principales :
https://www.loom.com/share/b70a8a268d5e42929ff18ecc8cbbc8e2?sid=4f81609b-b814-4dec-83c6-50a7aa3f41ce

---

## **Installation et lancement**

## ⚙️ Configuration (.env)

Avant de lancer le backend, créez un fichier `.env` à la racine du dossier `backend` avec le contenu suivant :

```env
MONGODB_URI=mongodb+srv://hakimhakim2206_db_user:50lJJsHW6e7SsFEw@test-lesbonsartisans.lznvu10.mongodb.net/?retryWrites=true&w=majority&appName=test-lesbonsartisans
PORT=3000
JWT_SECRET=q4Xp9M7tQzsKHLVrfvN28eYpCRa5SWxDjZ82FvQn1kTGb0aO
```

## _Lancer le backend_

```
cd backend
npm install
nodemon app.js      # ou node app.js selon ta config
```

L'API backend sera accessible par défaut sur http://localhost:3000

---

## _Lancer le frontend_

```
cd frontend/vite-project
npm install       
npm run dev   
```

L'interface utilisateur sera accessible sur http://localhost:5173 (ou autre port affiché par Vite).

---

_**Fonctionnalités principales**_

- CRUD complet sur les produits (affichage, création, édition, suppression)

- Interface responsive et moderne avec Material UI

- Mise à jour des produits en temps réel via WebSocket

- Gestion de l'authentification avec JWT

- Gestion de l'état global via Redux

- Notifications utilisateur et gestion des erreurs
