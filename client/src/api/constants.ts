// PATHS file
export const PATHS: { [key: string]: string } = {
  getAllTasks: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  addNewTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  completeTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  updateTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  deleteTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
};
