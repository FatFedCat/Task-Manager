const STATUS_OPTIONS = ["new", "in_progress", "done"];
const STATUS_LABELS = {
  new: "Новая",
  in_progress: "В работе",
  done: "Готово",
};

function TaskTable({ tasks, loading, processingId, onStatusChange, onDelete }) {
  if (loading) {
    return <p className="table-state">Загрузка задач...</p>;
  }

  if (!tasks.length) {
    return <p className="table-state">Пока нет задач. Создайте первую задачу выше.</p>;
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
        {tasks.map((task) => {
          const isProcessing = processingId === task.id;
          return (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description || "-"}</td>
              <td>
                <select
                  className={`status-select status-${task.status}`}
                  value={task.status}
                  disabled={isProcessing}
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
                <button
                  className="danger-button"
                  type="button"
                  disabled={isProcessing}
                  onClick={() => {
                    if (window.confirm(`Удалить задачу "${task.title}"?`)) {
                      onDelete(task.id);
                    }
                  }}
                >
                  {isProcessing ? "..." : "Удалить"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TaskTable;
