import axios from "axios";

const connection = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default connection;
