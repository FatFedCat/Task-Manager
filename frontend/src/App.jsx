import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from "./api/tasksApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchTasks();
      setTasks(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreateTask(payload) {
    try {
      setSubmitting(true);
      setError("");
      const newTask = await createTask(payload);
      setTasks((currentTasks) => [newTask, ...currentTasks]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(taskId, status) {
    try {
      setError("");
      setProcessingId(taskId);
      const updatedTask = await updateTaskStatus(taskId, status);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      setError("");
      setProcessingId(taskId);
      await deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <main className="container">
      <header className="page-header">
        <h1>AI Менеджер задач</h1>
        <p className="page-subtitle">Простой трекер задач на React + Node.js + PostgreSQL</p>
      </header>
      {error && <p className="error-message">{error}</p>}
      <section className="card">
        <TaskForm onSubmit={handleCreateTask} loading={submitting} />
      </section>
      <section className="card table-card">
        <TaskTable
          tasks={tasks}
          loading={loading}
          processingId={processingId}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      </section>
    </main>
  );
}

export default App;
