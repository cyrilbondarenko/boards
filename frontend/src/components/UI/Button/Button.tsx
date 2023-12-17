import React, {ReactElement, ReactNode} from 'react';
import cn from "classnames";

interface ButtonI {
    children: ReactElement | ReactNode,
    onClick?: () => void;
    className?: string
}

const Button = ({children, onClick, className}: ButtonI) => {

    let onClickHandler = () => {
        {onClick &&
            onClick();
        }
    }

    return (
        <button className={cn('button', className)} onClick={onClickHandler}>
            {children}
        </button>
    );
};

export default Button;