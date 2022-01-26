import config from "../config/config";
import axios from "axios";

function getAllRecipes() {
  return axios.get(config.BACKEND_URL + "/server/recipes/").then((res) => {
    return res.data;
  });
}
function postRecipe(data) {
  return axios
    .post(config.BACKEND_URL + "/server/recipes/", data)
    .then((res) => {
      return res.data;
    });
}

export default { getAllRecipes, postRecipe };
