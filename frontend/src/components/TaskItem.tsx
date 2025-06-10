import React from 'react';
import { Task } from '../types/task';
import { taskService } from '../services/taskService';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) => {
  const handleStatusChange = async () => {
    try {
      await taskService.updateTask(task.id, {
        status: task.status === 'pending' ? 'completed' : 'pending'
      });
      onTaskUpdated();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await taskService.deleteTask(task.id);
        onTaskDeleted();
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
      }
    }
  };

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-meta">
          <span className="task-status">
            Statut: {task.status === 'pending' ? 'En attente' : 'Terminée'}
          </span>
          <span className="task-date">
            Créée le: {new Date(task.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={handleStatusChange}
          className={`status-button ${task.status}`}
        >
          {task.status === 'pending' ? 'Marquer comme terminée' : 'Marquer comme en attente'}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Supprimer
        </button>
      </div>
    </div>
  );
}; 