import {
  createPost,
  getAllpost,
  gePostByUserId,
  updatePostByUserIdAndId,
  deletePostByUserIdAndId,
} from "../controller/post.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllpost);
router.post("/:id", createPost);
router.get("/:id", gePostByUserId);
router.put("/:id/:postId", updatePostByUserIdAndId);
router.delete("/:id/:postId", deletePostByUserIdAndId);

export default router;