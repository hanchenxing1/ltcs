import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import WalletReducer from "./reducer/wallet";
import UserReducer from "./reducer/userInfo";

const rootReducer = combineReducers({
  walletInfo: WalletReducer,
  userInfo: UserReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["chainId"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
const persistor = persistStore(store);
export { persistor };
export default store;
