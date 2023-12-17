import React from 'react';
import LabelInput from "../components/UI/LabelInput/LabelInput";
import {Formik} from "formik";
import {authAPI} from "../api/API";
import * as Yup from "yup";
import ImageInput from "../components/UI/ImageInput/ImageInput";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();

    const signupSchema = Yup.object().shape({
        name: Yup.string()
            .max(255, 'Имя не должно быть длиннее 255-ти символов')
            .required('Имя обязательно к вводу'),
        surname: Yup.string()
            .max(255, 'Фамилия не должна быть длиннее 255-ти символов')
            .required('Фамилия обязательна к вводу'),
        login: Yup.string()
            .min(6, 'Логин должен длиной минимум в 6 символов')
            .max(255, 'Логин не должен быть длиннее 255-ти символов')
            .required('Логин обязателен к вводу'),
        email: Yup.string().email('Некорректный адрес электронной почты').required('Адрес электронной почты обязателен к вводу'),
        password: Yup.string()
            .min(8, 'Пароль должен быть длиной минимум в 8 символов')
            .required('Пароль обязателен к вводу'),
        retypePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Повторение пароля обязательно к вводу'),
    });

    return (
        <section>
            <div className="container">
                <h1>Регистрация</h1>
                <Formik initialValues={{name: '', surname: '', middlename: '', login: '', email: '', password: '', retypePassword: '', avatar: '', position: ''}} validationSchema={signupSchema} onSubmit={async (values, { setSubmitting }) => {
                    const formData = new FormData();
                    for (let value in values) {
                        formData.append(value, values[value as keyof typeof values]);
                    }
                    let response = await authAPI.register(formData);
                    if (response.resultCode == 0) {
                        enqueueSnackbar(response.message, {variant: "success"});
                        navigate('/login')
                    } else {
                        enqueueSnackbar(response.message, {variant: "error"});
                    }
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
                          setFieldValue
                      }) => (
                        <form className={'flex flex-col items-start'} onSubmit={handleSubmit} encType="multipart/form-data">
                            <LabelInput type={'text'} name={'surname'} label={'Фамилия'} onChange={handleChange} errors={touched.surname && errors.surname}/>
                            <LabelInput type={'text'} name={'name'} label={'Имя'} onChange={handleChange} errors={touched.name && errors.name}/>
                            <LabelInput type={'text'} name={'middlename'} label={'Отчество'} onChange={handleChange} errors={touched.middlename && errors.middlename}/>
                            <LabelInput type={'text'} name={'position'} label={'Должность'} onChange={handleChange} errors={touched.position && errors.position}/>
                            <LabelInput type={'text'} name={'login'} label={'Логин'} onChange={handleChange} errors={touched.login && errors.login}/>
                            <LabelInput type={'text'} name={'email'} label={'Адрес электронной почты'} onChange={handleChange} errors={touched.email && errors.email}/>
                            <ImageInput name={'avatar'} label={'Аватар'} onChange={(event: any) => {
                                setFieldValue("avatar", event.currentTarget.files[0]);
                            }}/>
                            <LabelInput type={'password'} name={'password'} label={'Пароль'} onChange={handleChange} errors={touched.password && errors.password}/>
                            <LabelInput type={'password'} name={'retypePassword'} label={'Повтор пароля'} onChange={handleChange} errors={touched.retypePassword && errors.retypePassword}/>
                            <button type="submit" disabled={isSubmitting} className={'button'}>Регистрация</button>
                        </form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default Signup;