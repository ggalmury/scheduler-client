import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

export const rootReducer = combineReducers({
  account: accountReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
