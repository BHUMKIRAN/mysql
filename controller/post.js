import db from "../db/mysql.js";

const createPost = async (req, res) => {
  const { title, body } = req.body;
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) return res.status(400).json({ message: "invalid id" });
  try {
    
    const [result] = await db.query(
      "INSERT INTO post (title , body , user_id) VALUES (?,?,?)",
      [title, body, userId],
    
    );
    res
      .status(200)
      .json({ message: "post created successfully", postId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllpost = async (req, res) => {
  const [rows] = await db.query(`SELECT u.name , p.title FROM users as u INNER JOIN post as p ON u.id = p.user_id `);
  res.status(200).json(rows);
};

const gePostByUserId = async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) return res.status(400).json({ message: "invalid id" });
  try {
    const [rows] = await db.query(`SELECT * FROM post WHERE user_id = ?`, [
      userId,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePostByUserIdAndId = async (req, res) => {
  const userId = parseInt(req.params.id);
  const postId = parseInt(req.params.postId);
  const { title, body } = req.body;
  if (isNaN(userId) || isNaN(postId))
    return res.status(400).json({ message: "invalid id" });
  try {
    const [result] = await db.query(
      `UPDATE post SET title=? , body=? WHERE user_id=? AND id=?`,
      [title, body, userId, postId],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "post not found" });
    res.status(200).json({ message: "post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePostByUserIdAndId = async (req, res) => {
  const userId = parseInt(req.params.id);
  const postId = parseInt(req.params.postId);
  if (isNaN(userId) || isNaN(postId))
    return res.status(400).json({ message: "invalid id" });
  try {
    const [result] = await db.query(
      `DELETE FROM post WHERE user_id=? AND id=?`,
      [userId, postId],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "post not found" });
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPost,
  getAllpost,
  gePostByUserId,
  updatePostByUserIdAndId,
  deletePostByUserIdAndId,
};
