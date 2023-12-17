import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {setupStore} from "./store/store";
import {SnackbarProvider} from "notistack";

const container = document.getElementById('root')!;
const root = createRoot(container);

let store = setupStore();

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SnackbarProvider anchorOrigin={{vertical: "bottom", horizontal: "right"}} autoHideDuration={3000}>
                    <App/>
                </SnackbarProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
