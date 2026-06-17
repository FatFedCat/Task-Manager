function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const fallbackMessage =
    statusCode >= 500
      ? "Внутренняя ошибка сервера. Проверьте подключение к базе данных."
      : "Произошла ошибка при обработке запроса.";
  const message = err.message || fallbackMessage;

  if (process.env.NODE_ENV !== "test") {
    // Minimal server-side logging for debugging unexpected errors.
    console.error(err);
  }

  // Never expose raw DB/driver text for 5xx errors to UI.
  if (statusCode >= 500) {
    return res.status(statusCode).json({ message: fallbackMessage });
  }

  return res.status(statusCode).json({ message });
}

module.exports = errorHandler;
