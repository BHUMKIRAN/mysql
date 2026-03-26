import db from "../db/mysql.js";

/* 💡 DESTRUCTURING NOTE: 
  db.query() returns an array: [data, metadata].
  We use [rows] or [result] to "unpack" only the first item (the actual data) 
  and ignore the second item (field information).
*/

const createUser = async (req, res) => {
  const { email, name, age } = req.body;

  if (!email || !name || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
      [name, email, age],
    );

    res.status(200).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    // FIX: Added the response so the client actually receives the data
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  // FIX: Changed NaN(id) to isNaN(id)
  if (isNaN(id)) return res.status(400).json({ message: "invalid id" });

  try {
    // FIX: Changed table name from 'user' to 'users' to match others
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "user not found" });

    // Usually, for a single user, we return rows[0] instead of the whole array
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUderById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { email, name, age } = req.body;

  if (isNaN(id)) return res.status(400).json({ message: "invalid id" });

  try {
    const [result] = await db.query(
      `UPDATE users SET email=? , name=? , age=? WHERE id=?`,
      [email, name, age, id],
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "not valid id" });

  try {
    await db.query(`DELETE FROM post WHERE user_id = ?`, [id]);
    const [result] = await db.query(`DELETE FROM users WHERE id=?`, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, getUsers, getUserById, updateUderById, deleteUser };
