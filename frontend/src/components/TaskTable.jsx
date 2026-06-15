const STATUS_OPTIONS = ["new", "in_progress", "done"];

function TaskTable({ tasks, loading, onStatusChange, onDelete }) {
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (!tasks.length) {
    return <p>No tasks yet.</p>;
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
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
                    {statusOption}
                  </option>
                ))}
              </select>
            </td>
            <td>{new Date(task.created_at).toLocaleString()}</td>
            <td>
              <button type="button" onClick={() => onDelete(task.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
