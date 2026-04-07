import mysql2 from "mysql2/promise";

const db = mysql2.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "October12@",
  database: "learn",
});

db.getConnection()
  .then((conn) => {
    console.log("✅ Database connected successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

export default db;