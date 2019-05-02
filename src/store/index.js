import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export default store;
export { persistor };
