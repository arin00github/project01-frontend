import { applyMiddleware, combineReducers, compose, Store } from "redux";
import deplomacyReducer, { deplomacyState } from "./deplomacy/deplomacy-slice";
import { legacy_createStore as createStore } from "redux";

export interface AppState {
  deplomacy: deplomacyState | undefined;
}

export const reducers = {
  deplomacy: deplomacyReducer,
};

const configureStore = (initialStete?: AppState): Store => {
  const rootReducer = combineReducers({
    ...reducers,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const middleware: any[] = [];

  const enhancers = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const windowIfDefined = typeof window === "undefined" ? null : (window as any);

  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(rootReducer, initialStete, compose(applyMiddleware(...middleware), ...enhancers));
};

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
