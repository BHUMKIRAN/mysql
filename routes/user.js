import {createUser, getUsers, getUserById, updateUderById, deleteUser } from "../controller/user.js";
import { Router } from "express";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUderById);
router.delete("/:id", deleteUser);

export default router;