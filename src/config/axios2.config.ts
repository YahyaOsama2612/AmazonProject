import axios from "axios";

const axiostwoInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 1000,
});

export default axiostwoInstance;
