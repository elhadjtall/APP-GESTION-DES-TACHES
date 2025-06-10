import React, { useState } from 'react';
import { CreateTaskDTO } from '../types/task';
import { taskService } from '../services/taskService';

interface TaskFormProps {
  onTaskCreated: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    if (title.length > 100) {
      setError('Le titre ne doit pas dépasser 100 caractères');
      return;
    }

    if (description.length > 500) {
      setError('La description ne doit pas dépasser 500 caractères');
      return;
    }

    try {
      setIsSubmitting(true);
      const newTask: CreateTaskDTO = {
        title: title.trim(),
        description: description.trim()
      };
      
      await taskService.createTask(newTask);
      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (err) {
      setError('Erreur lors de la création de la tâche');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="Entrez le titre de la tâche"
          disabled={isSubmitting}
          maxLength={100}
        />
        <span className="character-count">{title.length}/100</span>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError('');
          }}
          placeholder="Entrez la description de la tâche"
          disabled={isSubmitting}
          maxLength={500}
        />
        <span className="character-count">{description.length}/500</span>
      </div>
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Ajout en cours...' : 'Ajouter la tâche'}
      </button>
    </form>
  );
}; 