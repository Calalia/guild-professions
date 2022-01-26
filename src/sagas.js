import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import charactersService from "./services/characters";
import reagentsService from "./services/reagents";
import recipesService from "./services/recipes";
import { updateUIMap } from "./ducks/ui";
import { fetchCharactersAC } from "./ducks/characters";
import { fetchReagentsAC } from "./ducks/reagents";
import { fetchRecipesAC } from "./ducks/recipes";
function* fetchCharacters(action) {
  try {
    const data = yield call(charactersService.getAllCharacters);
    yield put({ type: "SAVE_CHARACTERS", payload: data });
  } catch (e) {
    console.log("Character fetching failed");
  }
}
function* postCharacter(action) {
  try {
    const res = yield call(charactersService.postCharacter, action.payload);
    yield put(updateUIMap("addNewCharacterOpen", false));
    yield put(fetchCharactersAC());
  } catch (e) {
    console.log("Character posting failed");
  }
}
function* fetchReagents(action) {
  try {
    const data = yield call(reagentsService.getAllReagents);
    yield put({ type: "SAVE_REAGENTS", payload: data });
  } catch (e) {
    console.log("Reagent fetching failed");
  }
}
function* postReagent(action) {
  try {
    const res = yield call(reagentsService.postReagent, action.payload);
    //yield put(updateUIMap("addNewCharacterOpen", false));
    yield put(fetchReagentsAC());
  } catch (e) {
    console.log("Reagent posting failed");
  }
}
function* fetchRecipes(action) {
  try {
    const data = yield call(recipesService.getAllRecipes);
    yield put({ type: "SAVE_RECIPES", payload: data });
  } catch (e) {
    console.log("Recipe fetching failed");
  }
}
function* postRecipe(action) {
  try {
    const res = yield call(recipesService.postRecipe, action.payload);
    //yield put(updateUIMap("addNewCharacterOpen", false));
    yield put(fetchRecipesAC());
  } catch (e) {
    console.log("Recipe posting failed");
  }
}

export default function* rootSaga() {
  yield takeLatest("FETCH_CHARACTERS", fetchCharacters);
  yield takeLatest("POST_CHARACTER", postCharacter);
  yield takeLatest("FETCH_REAGENTS", fetchReagents);
  yield takeLatest("POST_REAGENT", postReagent);
  yield takeLatest("FETCH_RECIPES", fetchRecipes);
  yield takeLatest("POST_RECIPE", postRecipe);
}
