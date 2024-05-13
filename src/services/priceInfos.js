import config from "../config/config";
import axios from "axios";

function getAllPriceInfos() {
  return axios.get(config.BACKEND_URL + "/server/priceInfos/").then((res) => {
    return res.data;
  });
}
function postPriceInfo(data) {
  return axios
    .post(config.BACKEND_URL + "/server/priceInfos/", data)
    .then((res) => {
      return res.data;
    });
}

export default { getAllPriceInfos, postPriceInfo };
