import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/reducers/authSlice";
import {useSnackbar} from "notistack";
const Header = () => {

    let dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.auth.auth);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleLogoutClick = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        enqueueSnackbar("Вы успешно вышли из своего аккаунта", {variant: 'success'});
    };

    return (
        <header className={'bg-main text-white py-2'}>
            <div className={'container flex justify-between items-center'}>
                <NavLink to={'/'}><span className={'text-xl font-bold'}>Управление проектами структурного подразделения <br/> образовательной организации</span></NavLink>
                {authData.login
                    ? <div className={'flex items-center'}>
                        <NavLink to={'/profile'}><span className={'mr-4'}>{`${authData.surname} ${authData.name}`}</span></NavLink>
                        <NavLink to={'/'}><button className={'button'} onClick={handleLogoutClick}>Выйти</button></NavLink>
                    </div>
                    : <div className={'flex items-center'}>
                        <NavLink to={'/login'}><button className={'button mr-4'}>Вход</button></NavLink>
                        <NavLink to={'/signup'}><button className={'button'}>Регистрация</button></NavLink>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;