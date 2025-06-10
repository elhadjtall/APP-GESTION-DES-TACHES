import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/types/task';

const API_URL = 'http://localhost:3000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur inconnue est survenue' }));
    throw new Error(error.message || `Erreur HTTP! statut: ${response.status}`);
  }
  return response.json();
};

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur dans getAllTasks:', error);
      throw new Error('Impossible de récupérer les tâches. Veuillez vérifier que le serveur backend est en cours d\'exécution.');
    }
  },

  async createTask(task: CreateTaskDTO): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(task),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur dans createTask:', error);
      throw new Error('Impossible de créer la tâche');
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Une erreur inconnue est survenue' }));
        throw new Error(error.message || `Erreur HTTP! statut: ${response.status}`);
      }
      
      // Si la réponse est vide (204), on considère que c'est un succès
      if (response.status === 204) {
        return;
      }
      
      // Sinon on attend une réponse JSON
      await response.json();
    } catch (error) {
      console.error('Erreur dans deleteTask:', error);
      throw new Error('Échec de la suppression de la tâche');
    }
  },

  async updateTask(id: string, task: UpdateTaskDTO): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(task),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur dans updateTask:', error);
      throw new Error('Impossible de mettre à jour la tâche');
    }
  },
}; 