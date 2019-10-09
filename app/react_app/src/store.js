import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleWare = [thunk];

// Configuracion para desarrolladores
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleWare),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// Configuracion para usuarios
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleWare))
);

export default store;
