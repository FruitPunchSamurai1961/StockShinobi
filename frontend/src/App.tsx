import React from 'react';
import './assets/css/App.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import {AuthProvider} from "./components/context/AuthContext";
import {RouterProvider} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {router} from "./components/routes/Router";


export const {ToastContainer, toast} = createStandaloneToast()

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ChakraProvider>
                    <AuthProvider>
                        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                            <RouterProvider router={router}/>
                        </DevSupport>
                        <ToastContainer/>
                    </AuthProvider>
                </ChakraProvider>
            </Provider>
        </React.StrictMode>);
}

export default App;
