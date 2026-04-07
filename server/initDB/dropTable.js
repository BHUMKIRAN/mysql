// drop-tables.js
import db from "../db/mysql.js"

const dropTables = async () => {
  try {
    // Drop in reverse order
    console.log("Dropping orders...");
    await db.query("DROP TABLE IF EXISTS orders");
    console.log("Dropped orders");

    console.log("Dropping products...");
    await db.query("DROP TABLE IF EXISTS products");
    console.log("Dropped products");

    console.log("Dropping users...");
    await db.query("DROP TABLE IF EXISTS users");
    console.log("Dropped users");

    console.log("Dropping store...");
    await db.query("DROP TABLE IF EXISTS store");
    console.log("Dropped store");

    console.log("Dropping user...");
    await db.query("DROP TABLE IF EXISTS user");
    console.log("Dropped user");

    console.log("Dropping knex_migrations_lock...");
    await db.query("DROP TABLE IF EXISTS knex_migrations_lock");
    console.log("Dropped knex_migrations_lock");

    console.log("Dropping knex_migrations...");
    await db.query("DROP TABLE IF EXISTS knex_migrations");
    console.log("Dropped knex_migrations");

    console.log("✅ All tables dropped successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error dropping tables:", err);
    process.exit(1);
  }
};

dropTables();