import express from 'express';
import { getAllTasks, createTask, deleteTask, updateTask } from '../controllers/taskController';
import { validateId, validateCreateTask, validateUpdateTask } from '../middleware/validation';

const router = express.Router();

// Routes pour les tâches
router.get('/', getAllTasks);
router.post('/', validateCreateTask, createTask);
router.delete('/:id', validateId, deleteTask);
router.patch('/:id', validateId, validateUpdateTask, updateTask);

export default router; 