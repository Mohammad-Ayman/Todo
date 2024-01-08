import { Request, Response } from "express";
import { Task } from "../models/Task";

class TaskController {
  private static tasks: Task[] = [];

  static getAllTasks(req: Request, res: Response): void {
    res.json(TaskController.tasks);
  }

  static addTask(req: Request, res: Response): void {
    console.log("req", req.body);
    const newTask = {
      id: req.body.id,
      text: req.body.text,
      completed: req.body.completed,
    };
    TaskController.tasks.push(newTask);
    console.log("newTask", newTask);
    res.status(201).json(newTask);
  }

  static markTaskAsCompleted(req: Request, res: Response): void {
    console.log("req completed", req.body);
    const taskId = req.params.id;
    const updatedTaskIndex = TaskController.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (updatedTaskIndex !== -1) {
      TaskController.tasks[updatedTaskIndex].completed = !req.body.completed;
      res.json(TaskController.tasks[updatedTaskIndex]);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  }

  static updateTask(req: Request, res: Response): void {
    console.log("req", req.body);
    const taskId = req.params.id;
    const updatedTaskIndex = TaskController.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (updatedTaskIndex !== -1) {
      TaskController.tasks[updatedTaskIndex].text = req.body.text;
      res.json(TaskController.tasks[updatedTaskIndex]);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  }

  static deleteTask(req: Request, res: Response): void {
    const taskId = req.params.id;
    TaskController.tasks = TaskController.tasks.filter(
      (task) => task.id !== taskId
    );
    res.json({ message: "Task deleted successfully" });
  }
}

export default TaskController;
