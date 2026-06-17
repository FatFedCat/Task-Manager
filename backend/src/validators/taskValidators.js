const ALLOWED_STATUSES = ["new", "in_progress", "done"];

function validateTaskPayload(payload) {
  const title = typeof payload?.title === "string" ? payload.title.trim() : "";
  const description = typeof payload?.description === "string" ? payload.description.trim() : "";

  if (!title) {
    return { isValid: false, message: "Поле 'title' обязательно для заполнения." };
  }

  return {
    isValid: true,
    value: {
      title,
      description: description || null,
    },
  };
}

function validateTaskId(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return { isValid: false, message: "ID задачи должен быть положительным целым числом." };
  }

  return { isValid: true, value: parsedId };
}

function validateStatus(status) {
  if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status)) {
    return {
      isValid: false,
      message: `Статус должен быть одним из: ${ALLOWED_STATUSES.join(", ")}.`,
    };
  }

  return { isValid: true, value: status };
}

module.exports = {
  ALLOWED_STATUSES,
  validateTaskPayload,
  validateTaskId,
  validateStatus,
};
