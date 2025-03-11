import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userReducer } from "./userslice";
import { eventReducer } from "./eventslice";

const userPersistConfig = {
    key: "user",
    storage
};


const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        event:eventReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["persist/PERSIST"]
            }
        })
});


export const persistor = persistStore(store);
