import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import taskReducer from "./slices/taskSlice";
import dateReducer from "./slices/dateSlice";
import persistConfig from "./persistConfig";

const rootReducer = combineReducers({
  account: accountReducer,
  task: taskReducer,
  date: dateReducer,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
