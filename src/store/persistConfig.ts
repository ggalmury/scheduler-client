import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["login"],
};

export default persistConfig;
