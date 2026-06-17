const ApiError = require("../utils/ApiError");
const db = require("../config/db");
const {
  validateTaskPayload,
  validateTaskId,
  validateStatus,
} = require("../validators/taskValidators");

async function createTask(payload) {
  const taskPayloadValidation = validateTaskPayload(payload);
  if (!taskPayloadValidation.isValid) {
    throw new ApiError(400, taskPayloadValidation.message);
  }

  const { title, description } = taskPayloadValidation.value;

  const query = `
    INSERT INTO tasks (title, description)
    VALUES ($1, $2)
    RETURNING id, title, description, status, created_at
  `;
  const params = [title, description];
  const { rows } = await db.query(query, params);

  return rows[0];
}

async function getTasks() {
  const query = `
    SELECT id, title, description, status, created_at
    FROM tasks
    ORDER BY created_at DESC, id DESC
  `;

  const { rows } = await db.query(query);
  return rows;
}

async function updateTaskStatus(taskId, status) {
  const taskIdValidation = validateTaskId(taskId);
  if (!taskIdValidation.isValid) {
    throw new ApiError(400, taskIdValidation.message);
  }

  const statusValidation = validateStatus(status);
  if (!statusValidation.isValid) {
    throw new ApiError(400, statusValidation.message);
  }

  const query = `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING id, title, description, status, created_at
  `;
  const params = [statusValidation.value, taskIdValidation.value];
  const { rows } = await db.query(query, params);

  if (!rows.length) {
    throw new ApiError(404, `Задача с id ${taskIdValidation.value} не найдена.`);
  }

  return rows[0];
}

async function deleteTask(taskId) {
  const taskIdValidation = validateTaskId(taskId);
  if (!taskIdValidation.isValid) {
    throw new ApiError(400, taskIdValidation.message);
  }

  const query = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id
  `;
  const params = [taskIdValidation.value];
  const { rows } = await db.query(query, params);

  if (!rows.length) {
    throw new ApiError(404, `Задача с id ${taskIdValidation.value} не найдена.`);
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
