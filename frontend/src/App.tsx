import React from 'react';
import './assets/css/App.css';
import LinksData from "./utils/Links"
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import {useRoutes} from "react-router-dom";


function App() {

    // @ts-ignore
    const routes: RouteObject[] = LinksData.map((data) => (
        {id: data.name, path: data.path, Component: data.component}
    ));

    routes.push({
            id: "HomePage-Login",
            path: "/",
            Component: Login
        },
        {
            id: "NotFound",
            path: "*",
            Component: NotFound
        })

    return (
        <div>
            {useRoutes(routes)}
        </div>
    );
}

export default App;
