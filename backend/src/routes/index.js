const express = require("express");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/tasks", taskRoutes);

module.exports = router;
