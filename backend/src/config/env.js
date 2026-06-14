const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL || "",
};

if (!env.databaseUrl) {
  // Fail fast: backend should not start without DB connection string.
  throw new Error("DATABASE_URL is not set in environment variables.");
}

module.exports = env;
