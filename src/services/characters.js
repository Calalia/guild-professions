import config from "../config/config";
import axios from "axios";

function getAllCharacters() {
  return axios.get(config.BACKEND_URL + "/server/characters/").then((res) => {
    return res.data;
  });
}
function postCharacter(data) {
  return axios
    .post(config.BACKEND_URL + "/server/characters/", data)
    .then((res) => {
      return res.data;
    });
}
function deleteCharacter(data) {
  return axios
    .delete(config.BACKEND_URL + "/server/characters/" + data.id)
    .then((res) => {
      return res.data;
    });
}
function patchCharacter(data) {
  return axios
    .patch(config.BACKEND_URL + "/server/characters/" + data.id, data)
    .then((res) => {
      return res.data;
    });
}
export default {
  getAllCharacters,
  postCharacter,
  deleteCharacter,
  patchCharacter,
};
