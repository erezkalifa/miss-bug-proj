import express from "express";
import {
  getUsers,
  getUser,
  removeUser,
  addUser,
  updateUser,
} from "./user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.delete("/:userId", removeUser);
router.post("/", addUser);
router.put("/:userId", updateUser);

export const userRoutes = router;
