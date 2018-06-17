import { combineReducers } from "redux";
import cardsById from "./cardsById";
import listsById from "./listsById";
import boardsById from "./boardsById";
import currentBoardId from "./currentBoardId";

export default combineReducers({
  cardsById,
  listsById,
  boardsById,
  currentBoardId
});
