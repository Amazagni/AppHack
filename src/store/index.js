import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistReducer, persistStore } from "redux-persist";

import pointsSlice from "./slices/pointsSlice";
import userSlice from "./slices/userSlice";
import questSlice from "./slices/questSlice";
const reducers = combineReducers({
  points: pointsSlice,
  user: userSlice,
  quests: questSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
setupListeners(store.dispatch);
export { store, persistor };
