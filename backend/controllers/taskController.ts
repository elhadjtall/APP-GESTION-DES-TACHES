import { Request, Response } from 'express';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task';
import { v4 as uuidv4 } from 'uuid';

// Stockage en mémoire des tâches
let tasks: Task[] = [];

export const getAllTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request<{}, {}, CreateTaskDTO>, res: Response) => {
  const { title, description } = req.body;
  
  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const deleteTask = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'L\'identifiant de la tâche est requis' });
    }

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export const updateTask = (req: Request<{ id: string }, {}, UpdateTaskDTO>, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: 'L\'identifiant de la tâche est requis' });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Aucune donnée de mise à jour fournie' });
    }

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Vérifier que les champs mis à jour sont valides
    const allowedUpdates = ['title', 'description', 'status'];
    const isValidUpdate = Object.keys(updates).every(key => allowedUpdates.includes(key));

    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Champs de mise à jour invalides' });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates
    };

    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}; 