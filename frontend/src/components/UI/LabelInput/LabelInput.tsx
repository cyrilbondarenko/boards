import React from 'react';

interface ILabelInput {
    label: string
    type: string
    name: string
    onChange: any
    value?: string
    errors?: string | false
}

const LabelInput = ({label, type, name, onChange, value, errors}: ILabelInput) => {
    return (
        <label className={"mb-2 flex flex-col w-[300px]"}>
            <span>{label}</span>
            <input type={type} name={name} onChange={onChange} value={value} className={'input'}/>
            {errors && <span className={'text-red-600 text-sm'}>{errors}</span>}
        </label>
    );
};

export default LabelInput;