const taskService = require("../services/taskService");

async function createTask(req, res, next) {
  try {
    const result = await taskService.createTask(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getTasks(req, res, next) {
  try {
    const result = await taskService.getTasks();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateTaskStatus(req, res, next) {
  try {
    const result = await taskService.updateTaskStatus(req.params.id, req.body.status);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
