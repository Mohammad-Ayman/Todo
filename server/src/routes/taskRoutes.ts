import express from "express";
import TaskController from "../controllers/taskController";

const router = express.Router();

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.addTask);
router.put("/completed/:id", TaskController.markTaskAsCompleted);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
