import { useState } from "react";

function TaskForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Создать задачу</h2>
      <label>
        Название
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Введите название задачи"
          disabled={loading}
          required
        />
      </label>
      <label>
        Описание
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Введите описание задачи"
          disabled={loading}
          rows={3}
        />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? "Создание..." : "Создать задачу"}
      </button>
    </form>
  );
}

export default TaskForm;
