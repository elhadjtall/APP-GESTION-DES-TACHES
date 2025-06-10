# Application de Gestion de Tâches

Une application fullstack de gestion de tâches construite avec React, TypeScript, Express.js et Vite.

## Structure du Projet

Le projet est organisé en deux parties principales :

- `frontend/` : Application React avec TypeScript et Vite
- `backend/` : API REST avec Express.js et TypeScript

## Fonctionnalités

- Affichage de la liste des tâches
- Ajout de nouvelles tâches
- Modification des tâches existantes
- Suppression de tâches
- Interface utilisateur moderne et réactive

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

Le serveur backend démarrera sur le port 3000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application frontend sera accessible sur http://localhost:5173

## Technologies Utilisées

### Frontend
- React
- TypeScript
- Vite
- CSS moderne

### Backend
- Node.js
- Express.js
- TypeScript
- REST API

## API Endpoints

- `GET /tasks` : Récupérer toutes les tâches
- `POST /tasks` : Créer une nouvelle tâche
- `PATCH /tasks/:id` : Mettre à jour une tâche
- `DELETE /tasks/:id` : Supprimer une tâche # APP-GESTION-DES-TACHES
