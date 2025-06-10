import { Request, Response, NextFunction } from 'express';
import { CreateTaskDTO, UpdateTaskDTO } from '../types/task';

// Validation de l'ID
export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'L\'identifiant de la tâche est requis' });
  }
  next();
};

// Validation de la création de tâche
export const validateCreateTask = (req: Request<{}, {}, CreateTaskDTO>, res: Response, next: NextFunction) => {
  const { title, description } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ message: 'Le titre est requis' });
  }

  if (title.length > 100) {
    return res.status(400).json({ message: 'Le titre ne doit pas dépasser 100 caractères' });
  }

  if (description && description.length > 500) {
    return res.status(400).json({ message: 'La description ne doit pas dépasser 500 caractères' });
  }

  next();
};

// Validation de la mise à jour de tâche
export const validateUpdateTask = (req: Request<{}, {}, UpdateTaskDTO>, res: Response, next: NextFunction) => {
  const { title, description, status } = req.body;

  if (title !== undefined) {
    if (title.trim().length === 0) {
      return res.status(400).json({ message: 'Le titre ne peut pas être vide' });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: 'Le titre ne doit pas dépasser 100 caractères' });
    }
  }

  if (description !== undefined && description.length > 500) {
    return res.status(400).json({ message: 'La description ne doit pas dépasser 500 caractères' });
  }

  if (status !== undefined && !['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Le statut doit être "pending" ou "completed"' });
  }

  next();
}; 