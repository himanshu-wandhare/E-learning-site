import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    common: {
      Authorization: localStorage.getItem("TOKEN"),
    },
  },
});
