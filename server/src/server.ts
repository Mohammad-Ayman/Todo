import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Use the task routes
app.use("/tasks", taskRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const server = app.listen(port, () => {
  if (app.get("env") === "development") {
    console.log(`Server is running at http://localhost:${port}`);
  }
});

export default server;
