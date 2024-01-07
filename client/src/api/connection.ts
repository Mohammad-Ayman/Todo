import axios from "axios";

const connection = axios.create({
  baseURL: process.env.API_URL,
});

export default connection;
