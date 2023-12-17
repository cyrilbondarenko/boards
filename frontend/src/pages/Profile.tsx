import { Formik } from 'formik';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import LabelInput from "../components/UI/LabelInput/LabelInput";
import {API, authAPI, profileAPI} from "../api/API";
import ImageInput from "../components/UI/ImageInput/ImageInput";
import {setAuth} from "../store/reducers/authSlice";
import {useSnackbar} from "notistack";
import * as Yup from "yup";

const Profile = () => {

    let dispatch = useAppDispatch();
    let data = useAppSelector(state => state.auth.auth);

    let [isEditing, setIsEditing] = useState<any>(false);
    let [avatar, setAvatar] = useState<any>();

    const { enqueueSnackbar } = useSnackbar();

    const dataSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Имя не должно быть длиннее 255-ти символов')
            .required('Имя обязательно к вводу'),
        surname: Yup.string()
            .max(50, 'Фамилия не должна быть длиннее 255-ти символов')
            .required('Фамилия обязательна к вводу'),
        email: Yup.string().email('Некорректный адрес электронной почты').required('Адрес электронной почты обязателен к вводу'),
        password: Yup.string()
            .min(8, 'Пароль должен быть длиннее 8-ми символов')
            .required('Пароль обязателен к вводу'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Повторение пароля обязательно к вводу'),
    });

    const passwordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(8, 'Пароль должен быть длиннее 8-ми символов')
            .required('Пароль обязателен к вводу'),
        newPassword: Yup.string()
            .min(8, 'Пароль должен быть длиннее 8-ми символов')
            .required('Пароль обязателен к вводу'),
        repeatNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать')
            .required('Повторение пароля обязательно к вводу'),
    });

    return (
        <section>
            <div className="container">
                {!isEditing ? <>
                    {data.avatar && <img src={data.avatar} alt="" className={"max-w-[300px] max-h-[300px] mb-2 border-2 border-secondary"}/>}
                    <p className={"mb-2"}>ФИО: {data.surname} {data.name} {data.middlename}</p>
                    {data.position && <p className={"mb-2"}>Должность: {data.position}</p>}
                    <p className={"mb-2"}>Адрес электронной почты: {data.email}</p>
                    <p className={"mb-2"}>Логин: {data.login}</p>
                    <button className={"button"} onClick={() => {setIsEditing(true)}}>Редактировать <i className={"fa fa-pencil"}></i></button>
                </> : <>
                    <h1>Редактирование профиля</h1>
                    <div className={'flex flex-col max-w-[300px] mb-2'}>
                        <h2>Фотография</h2>
                        <ImageInput src={data.avatar} onChange={(e: any) => {
                            setAvatar(e.target.files[0]);
                        }}/>
                        <button className={'button'} onClick={async (e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('avatar', avatar);
                            let response = await profileAPI.updateAvatar(formData);
                            if (response.resultCode == 0) {
                                let authResponse = await authAPI.auth();
                                dispatch(setAuth(authResponse.data));
                                enqueueSnackbar(response.message, {variant: 'success'});
                                setIsEditing(false);
                            } else {
                                enqueueSnackbar(response.message, {variant: 'error'});
                            }
                        }}>Сохранить</button>
                    </div>
                    <div className={'flex flex-col items-start mb-2'}>
                        <h2>Общая информация</h2>
                        <Formik initialValues={{ name: data.name, surname: data.surname, middlename: data.middlename, position: data.position, email: data.email, password: '', repeatPassword: '' }}
                                validationSchema={dataSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    let response = await profileAPI.updateProfile(values.name, values.surname, values.middlename, values.position, values.email, values.password);
                                    if (response.resultCode == 0) {
                                        let authResponse = await authAPI.auth();
                                        dispatch(setAuth(authResponse.data));
                                        enqueueSnackbar(response.message, {variant: 'success'});
                                        setIsEditing(false);
                                    } else {
                                        enqueueSnackbar(response.message, {variant: 'error'});
                                    }
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
                                <form onSubmit={handleSubmit} className={"flex flex-col"}>
                                    <LabelInput label={'Фамилия'} type={'text'} name={'surname'} value={values.surname || undefined} errors={touched.surname && errors.surname} onChange={handleChange}/>
                                    <LabelInput label={'Имя'} type={'text'} name={'name'} value={values.name || undefined} errors={touched.name && errors.name} onChange={handleChange}/>
                                    <LabelInput label={'Отчество'} type={'text'} name={'middlename'} value={values.middlename || undefined} errors={touched.middlename && errors.middlename} onChange={handleChange}/>
                                    <LabelInput label={'Должность'} type={'text'} name={'position'} value={values.position || undefined} errors={touched.position && errors.position} onChange={handleChange}/>
                                    <LabelInput label={'E-mail'} type={'email'} name={'email'} value={values.email || undefined} errors={touched.email && errors.email} onChange={handleChange}/>
                                    <LabelInput label={'Пароль'} type={'password'} name={'password'} value={values.password} errors={touched.password && errors.password}onChange={handleChange}/>
                                    <LabelInput label={'Повтор пароля'} type={'password'} name={'repeatPassword'} value={values.repeatPassword} errors={touched.repeatPassword && errors.repeatPassword} onChange={handleChange}/>
                                    <button type="submit" className={'button'}>
                                        Сохранить изменения
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div className={'flex flex-col items-start mb-2'}>
                        <h2>Смена пароля</h2>
                        <Formik initialValues={{ currentPassword: '', newPassword: '', repeatNewPassword: '' }}
                                validationSchema={passwordSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    let response = await profileAPI.updatePassword(values.currentPassword, values.newPassword);
                                    if (response.resultCode == 0) {
                                        let authResponse = await authAPI.auth();
                                        dispatch(setAuth(authResponse.data));
                                        enqueueSnackbar(response.message, {variant: 'success'});
                                        setIsEditing(false);
                                    } else {
                                        enqueueSnackbar(response.message, {variant: 'error'});
                                    }
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
                                <form onSubmit={handleSubmit} className={"flex flex-col"}>
                                    <LabelInput label={'Текущий пароль'} type={'password'} name={'currentPassword'} value={values.currentPassword} onChange={handleChange}/>
                                    <LabelInput label={'Новый пароль'} type={'password'} name={'newPassword'} value={values.newPassword} onChange={handleChange}/>
                                    <LabelInput label={'Повтор нового пароля'} type={'password'} name={'repeatNewPassword'} value={values.repeatNewPassword} onChange={handleChange}/>
                                    <button type="submit" className={'button'}>Сохранить изменения</button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </>}
            </div>
        </section>
    );
};

export default Profile;