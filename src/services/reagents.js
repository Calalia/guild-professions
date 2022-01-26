import config from "../config/config";
import axios from "axios";

function getAllReagents() {
  return axios.get(config.BACKEND_URL + "/server/reagents/").then((res) => {
    return res.data;
  });
}
function postReagent(data) {
  return axios
    .post(config.BACKEND_URL + "/server/reagents/", data)
    .then((res) => {
      return res.data;
    });
}

export default { getAllReagents, postReagent };
