import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Exchanges from "./components/Exchanges.jsx";
import DataByYear from "./components/DataByYear.jsx";
import CoinData from "./components/CoinData.jsx";
import Coins from "./components/Coins.jsx";
import CoinsDetail from "./components/CoinsDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Exchanges />,
  },
  {
    path: "/databyyear",
    element: <DataByYear />,  
  },
  {
    path: "/exchangesdata/:year",
    element: <CoinData />,  
  },
  {
    path: "/coins",
    element: <Coins />,  
  },
  {
    path: "/coins/:id",
    element: <CoinsDetail />,  
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
