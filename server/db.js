const { Pool } = require("pg");

// Make sure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing in environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // Force SSL because your DB requires it
  ssl: {
    rejectUnauthorized: false,
  },

  // Stability settings
  max: 10,                  // maximum connections in pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // wait max 10s for connection
});

// When connected
pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

// When error happens in pool
pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL error:", err);
});

// Optional: safer query wrapper (recommended)
async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error("❌ DB Query Error:", err);
    throw err;
  }
}

module.exports = {
  pool,
  query,
};
