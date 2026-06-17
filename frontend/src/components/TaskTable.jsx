const STATUS_OPTIONS = ["new", "in_progress", "done"];
const STATUS_LABELS = {
  new: "Новая",
  in_progress: "В работе",
  done: "Готово",
};

function TaskTable({ tasks, loading, onStatusChange, onDelete }) {
  if (loading) {
    return <p>Загрузка задач...</p>;
  }

  if (!tasks.length) {
    return <p>Пока нет задач.</p>;
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Создано</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description || "-"}</td>
            <td>
              <select
                value={task.status}
                onChange={(event) => onStatusChange(task.id, event.target.value)}
              >
                {STATUS_OPTIONS.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {STATUS_LABELS[statusOption]}
                  </option>
                ))}
              </select>
            </td>
            <td>{new Date(task.created_at).toLocaleString("ru-RU")}</td>
            <td>
              <button type="button" onClick={() => onDelete(task.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
