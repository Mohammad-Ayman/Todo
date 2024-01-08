import request from "supertest";
import server from "../src/server"; // Update this path

describe("Task API", () => {
  it("should get all tasks", async () => {
    const response = await request(server).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should add a new task", async () => {
    const taskData = {
      id: "1",
      text: "Test Task",
      completed: false,
    };

    const response = await request(server).post("/tasks").send(taskData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(taskData);
  });


  it("should update a task", async () => {
    const taskId = "1";
    const updatedTaskData = {
      text: "Updated Task",
    };

    const response = await request(server)
      .put(`/tasks/${taskId}`)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body.text).toBe(updatedTaskData.text);
  });

  it("should delete a task", async () => {
    const taskId = "1";

    const response = await request(server).delete(`/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });

  afterAll(() => {
    server.close();
  });
});
