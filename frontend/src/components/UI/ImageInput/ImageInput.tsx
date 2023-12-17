import React, { useState } from 'react';
import s from "./LabelInput.module.scss";
import {useSnackbar} from "notistack";

interface ILabelInput {
    label?: string
    name?: string
    onChange: any
    value?: string
    src?: string | null
    className?: string
}

const LabelInput = ({label, name, onChange, value, src, className}: ILabelInput) => {

    const { enqueueSnackbar } = useSnackbar();

    let [image, setImage] = useState<string|null>(src ? src : '');

    let handleChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            if (/(\.jpg|\.jpeg|\.webp|\.gif|\.png)$/i.exec(event.target.files[0].name)) {
                setImage(URL.createObjectURL(event.target.files[0]));
            } else {
                enqueueSnackbar("В это поле можно загрузить только изображение", {variant: "error"});
            }
        } else {
            setImage('');
        }
        onChange(event);
    };

    return (
        <label className={`mb-2 flex flex-col w-[250px] ${className}`}>
            {label && <span className={"mb-2"}>{label}</span>}
            {image && <img src={image} alt="" className={"w-full max-h-[250px] mb-2 border-2 border-secondary object-cover"}/>}
            <input type={'file'} name={name} onChange={handleChange} value={value} className={'input'} hidden={true} accept=".jpg, .png, .jpeg, .gif, .webp"/>
            <div className={'button text-center cursor-pointer'}>Выбрать изображение</div>
        </label>
    );
};

export default LabelInput;