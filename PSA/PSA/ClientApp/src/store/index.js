import { createStore, applyMiddleware, compose } from "redux";
import createMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { routerMiddleware } from "connected-react-router";
import apiManager from "../service/middleware";
import rootReducer from "../redux/reducers";
import { createBrowserHistory } from "history";

const log = require(`redux-logger`);
const api = apiManager.create();
const history = createBrowserHistory();
const sagaMiddleware = createMiddleware({
    context: {
        api
    }
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer(history));


export default () => {
    const middlewares = [];

    middlewares.push(sagaMiddleware);
    middlewares.push(thunk);
    middlewares.push(routerMiddleware(history));
    const store = compose(applyMiddleware(...middlewares))(createStore)(
        persistedReducer
    );

    const persistor = persistStore(store, null, () => {
    });

    return { store, persistor, history };
};
