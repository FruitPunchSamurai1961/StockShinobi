import React from 'react';
import './assets/css/App.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import {AuthProvider} from "./components/context/AuthContext";
import {RouterProvider} from "react-router-dom";
import {router} from "./components/routes/Router";


export const {ToastContainer, toast} = createStandaloneToast()
function App() {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router}/>
                    <ToastContainer/>
                </AuthProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default App;
