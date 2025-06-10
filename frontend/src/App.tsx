import { useState, useEffect } from 'react'
import { Task } from './types/task'
import { taskService } from './services/taskService'
import { TaskForm } from './components/TaskForm'
import { TaskItem } from './components/TaskItem'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.getAllTasks()
      setTasks(fetchedTasks)
      setError('')
    } catch (err) {
      setError('Erreur lors du chargement des tâches')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleTaskCreated = () => {
    fetchTasks()
  }

  const handleTaskUpdated = () => {
    fetchTasks()
  }

  const handleTaskDeleted = () => {
    fetchTasks()
  }

  return (
    <div className="app-container">
      <header>
        <h1>Gestionnaire de Tâches</h1>
      </header>

      <main>
        <TaskForm onTaskCreated={handleTaskCreated} />
        
        {error && <div className="error-message">{error}</div>}

        {isLoading ? (
          <div className="loading">Chargement des tâches...</div>
        ) : tasks.length === 0 ? (
          <div className="no-tasks">Aucune tâche pour le moment</div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
