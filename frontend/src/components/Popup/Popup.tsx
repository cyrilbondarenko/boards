import React from 'react';
import {useNavigate} from "react-router-dom";

interface PopupI {
    children: React.ReactElement | React.ReactNode
}

const Popup = ({children}: PopupI) => {
    let navigate = useNavigate();

    let handleClose = () => {
        navigate('..');
    };

    return (
        <div className={'fixed top-0 left-0 w-screen h-screen z-[1] overflow-auto'}>
            <div className={'w-full h-full py-16 px-4 flex justify-center'}>
                <div className={'w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0'} onClick={handleClose}></div>
                <div className={'max-w-full max-h-full relative z-[1] flex flex-col items-center'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;