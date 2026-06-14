function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "test") {
    // Minimal server-side logging for debugging unexpected errors.
    console.error(err);
  }

  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
