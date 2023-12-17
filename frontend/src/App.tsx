import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Boards from './pages/Boards';
import Board from './pages/Board';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {authAPI} from "./api/API";
import {setAuth} from "./store/reducers/authSlice";
import Profile from "./pages/Profile";

function App() {

    let dispatch = useAppDispatch();
    let authData = useAppSelector(state => state.auth.auth);
    let [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authAPI.auth().then((response: any) => {
                dispatch(setAuth(response.data));
                setAuthenticated(true);
            });
        }
    }, [localStorage.getItem('token')]);

    return (
        <div className={'h-screen'}>
            <Header/>
            <Routes>
                <Route path={''} element={<Main/>}/>
                <Route path={'login'} element={<>
                    {authenticated && authData.id ? <Navigate to={'/'}/> : null}
                    <Login/>
                </>}/>
                <Route path={'signup'} element={<>
                    {authenticated && authData.id ? <Navigate to={'/'}/> : null}
                    <Signup/>
                </>}/>
                <Route path={'profile'} element={<>
                    {authenticated && authData.id ? null : <Navigate to={'/'}/>}
                    <Profile/>
                </>}/>
                <Route path={'boards'} element={<>
                    {authenticated && !authData.id ? <Navigate to={'/'}/> : null}
                    <Boards/>
                </>}/>
                <Route path={'board/:boardId/*'} element={<>
                    {authenticated && !authData.id ? <Navigate to={'/'}/> : null}
                    <Board/>
                </>}/>
            </Routes>
        </div>
    );
}

export default App;
