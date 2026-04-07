// init-db.js
import db from "../db/mysql.js"; // adjust the path if needed

// 1️⃣ Categories table
export const createCategories = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};

// 2️⃣ Store table
export const createStore = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS store (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(40) NOT NULL,
      email VARCHAR(100)
    )
  `);
};

// 3️⃣ Users table
export const createUsers = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// 4️⃣ Products table
export const createProducts = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category_id INT UNSIGNED,
      store_id INT UNSIGNED,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
      FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE SET NULL
    )
  `);
};

// 5️⃣ Orders table
export const createOrders = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      product_id INT UNSIGNED NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      total DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);
};

// 🚀 Initialize all tables in order
const initDB = async () => {
  try {
    await createCategories();
    await createStore();
    await createUsers();
    await createProducts();
    await createOrders();
    console.log("✅ All tables created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  }
};

initDB();