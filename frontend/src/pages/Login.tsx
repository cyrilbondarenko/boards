import React, {useState} from 'react';
import {Formik} from "formik";
import LabelInput from "../components/UI/LabelInput/LabelInput";
import {authAPI, axiosAPI} from "../api/API";
import {useAppDispatch} from "../hooks/redux";
import {setAuth} from "../store/reducers/authSlice";
import * as Yup from 'yup';
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const Login = () => {

    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onSubmit = async (values: any) => {
        try {
            let response = await authAPI.login(values.login, values.password);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axiosAPI.updateInstance();
                let authResponse = await authAPI.auth();
                dispatch(setAuth(authResponse.data));
                enqueueSnackbar('Авторизация прошла успешно', {variant: 'success'});
                navigate('/');
            } else {
                enqueueSnackbar(response.data.message, {variant: 'error'});
            }
        } catch (e) {
        }
    };

    const loginSchema = Yup.object().shape({
        login: Yup.string()
            .min(6, 'Логин должен быть длиной минимум в 6 символов')
            .max(255, 'Логин не должен быть длиннее 255-ти символов')
            .required('Логин обязателен к вводу'),
        password: Yup.string()
            .min(8, 'Пароль должен быть длиной минимум в 8 символов')
            .required('Пароль обязателен к вводу')
    });

    return (
        <section>
            <div className="container">
                <h1>Войти</h1>
                <Formik initialValues={{login: '', password: ''}} validationSchema={loginSchema} onSubmit={(values, { setSubmitting }) => {
                    onSubmit(values);
                    setSubmitting(false);
                }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form className={'flex flex-col items-start'} onSubmit={handleSubmit}>
                            <LabelInput type={'text'} name={'login'} label={'Логин'} onChange={handleChange} errors={touched.login && errors.login}/>
                            <LabelInput type={'password'} name={'password'} label={'Пароль'} onChange={handleChange} errors={touched.password && errors.password}/>
                            <button type="submit" disabled={isSubmitting} className={'button'}>Войти</button>
                        </form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default Login;