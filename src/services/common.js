import config from "../config/config";
import axios from "axios";

function commonGetAll(table) {
  return axios
    .get(config.BACKEND_URL + "/server/" + table + "/")
    .then((res) => {
      return res.data;
    });
}
function commonPost(table, data) {
  return axios
    .post(config.BACKEND_URL + "/server/" + table + "/", data)
    .then((res) => {
      return res.data;
    });
}
function commonDelete(table, data) {
  return axios
    .delete(config.BACKEND_URL + "/server/" + table + "/" + data.id)
    .then((res) => {
      return res.data;
    });
}
function commonPatch(table, data) {
  return axios
    .patch(config.BACKEND_URL + "/server/" + table + "/" + data.id, data)
    .then((res) => {
      return res.data;
    });
}
export default {
  commonGetAll,
  commonPost,
  commonDelete,
  commonPatch,
};
