import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

const Main = () => {
    let authData = useAppSelector(state => state.auth.auth);

    return (
        <section>
            <div className={'container'}>
                <h1>Добро пожаловать в приложение управления проектами!</h1>
                <p className={'mb-4'}>Доступные действия:</p>
                <ul className={'flex'}>
                    {authData.id ? <>
                        <li><Link to={'/boards'}><span className={'button'}>Перейти к доскам</span></Link></li>
                    </> : <>
                        <li className={'mr-4'}><Link to={'/login'}><span className={'button'}>Вход</span></Link></li>
                        <li><Link to={'/signup'}><span className={'button'}>Регистрация</span></Link></li>
                    </>}
                </ul>
            </div>
        </section>
    );
};

export default Main;