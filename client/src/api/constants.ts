// PATHS file
export const PATHS: { [key: string]: string } = {
  getAllTasks: `${process.env.NEXT_PUBLIC_API_URL}/getAllTasks`,
  addNewTask: `${process.env.NEXT_PUBLIC_API_URL}/addNewTask`,
  completeTask: `${process.env.NEXT_PUBLIC_API_URL}/completeTask`,
  deleteTask: `${process.env.NEXT_PUBLIC_API_URL}/deleteTask`,
};
