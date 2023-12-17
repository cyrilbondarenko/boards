import React from 'react';
import cn from 'classnames';
import './Input.scss';

interface IInput {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    className: string
}

const Input = ({value, onChange, className}: IInput) => {
    return (
        <input type="text" className={cn('input', className)} value={value} onChange={onChange}/>
    );
};

export default Input;