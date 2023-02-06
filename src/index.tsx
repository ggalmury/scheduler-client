import { configureStore, createStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import MainRouter from "./components/routers/MainRouter";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./store/rootReducer";
import "./styles/main.scss";

export const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
