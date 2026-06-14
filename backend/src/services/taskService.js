const ApiError = require("../utils/ApiError");

async function createTask() {
  throw new ApiError(501, "createTask is not implemented yet.");
}

async function getTasks() {
  throw new ApiError(501, "getTasks is not implemented yet.");
}

async function updateTaskStatus() {
  throw new ApiError(501, "updateTaskStatus is not implemented yet.");
}

async function deleteTask() {
  throw new ApiError(501, "deleteTask is not implemented yet.");
}

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
