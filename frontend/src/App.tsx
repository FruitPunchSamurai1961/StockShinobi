import React from 'react';
import './assets/css/App.css';
import logo from "./assets/images/logo.svg";
import {BrowserRouter, Route, RouteObject, Routes, useRoutes} from "react-router-dom";
import LinksData from "./utils/Links"
import Cookies from "universal-cookie";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";

export const cookies: Cookies = new Cookies();

function App() {

  // @ts-ignore
  const routes: RouteObject[] = LinksData.map((data) => (
      {id: data.name, path: data.path, Component: data.component}
  ));

  routes.push({
        id: "HomePage-Login",
        path: "/",
        Component: Login
  })

  return (
      <BrowserRouter>
          <Routes>
              <Route
                  path="/"
                  element={<Login />}
              />
              <Route
                  path="/home"
                  element={<Home />}
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
