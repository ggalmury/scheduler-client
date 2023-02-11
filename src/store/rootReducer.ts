import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
import taskReducer from "./slices/taskSlice";
import persistConfig from "./persistConfig";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  task: taskReducer,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
