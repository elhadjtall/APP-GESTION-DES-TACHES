import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5176',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Middleware de gestion des erreurs
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Gestion des routes non trouvées
app.use((req: express.Request, res: express.Response) => {
  console.log('Route non trouvée:', req.method, req.url);
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
}); 