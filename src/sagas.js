import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import commonservice from "./services/common";
import charactersService from "./services/characters";
import reagentsService from "./services/reagents";
import recipesService from "./services/recipes";
import priceInfosService from "./services/priceInfos";
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
function* deleteCharacter(action) {
  try {
    const res = yield call(charactersService.deleteCharacter, action.payload);
    yield put(fetchCharactersAC());
  } catch (e) {
    console.log("Character delete failed");
  }
}
function* patchCharacter(action) {
  try {
    const res = yield call(charactersService.patchCharacter, action.payload);
    yield put(fetchCharactersAC());
  } catch (e) {
    console.log("Character update failed");
  }
}
function* commonPatch(action) {
  try {
    const res = yield call(charactersService.patchCharacter, action.payload);
    yield put(fetchCharactersAC());
  } catch (e) {
    console.log("Character update failed");
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
function* putReagent(action) {
  try {
    const res = yield call(reagentsService.putReagent, action.payload);
    //yield put(updateUIMap("addNewCharacterOpen", false));
    yield put(fetchReagentsAC());
  } catch (e) {
    console.log("Reagent putting failed");
  }
}
function* fetchRecipes(action) {
  try {
    const data = yield call(recipesService.getAllRecipes);
    const prices = yield call(priceInfosService.getAllPriceInfos);
    yield put({ type: "SAVE_RECIPES", payload: data });
    yield put({ type: "SAVE_PRICES", payload: prices });
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
  yield takeLatest("DELETE_CHARACTER", deleteCharacter);
  yield takeLatest("PATCH_CHARACTER", patchCharacter);
  yield takeLatest("COMMON_PATCH", commonPatch);
  yield takeLatest("FETCH_REAGENTS", fetchReagents);
  yield takeLatest("POST_REAGENT", postReagent);
  yield takeLatest("PUT_REAGENT", putReagent);
  yield takeLatest("FETCH_RECIPES", fetchRecipes);
  yield takeLatest("POST_RECIPE", postRecipe);
}
