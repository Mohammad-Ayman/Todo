// PATHS file
export const PATHS: { [key: string]: string } = {
  getAllTasks: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  addNewTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  updateStatus: `${process.env.NEXT_PUBLIC_API_URL}/tasks/completed`,
  updateTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
  deleteTask: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
};
