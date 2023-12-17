import React from 'react';
import {NavLink} from "react-router-dom";

export interface ITask {
    id: number
    title: string
    image: string
    description: string
    date: string
}

const Task = ({title, image, id, description, date}: ITask) => {
    return (
        <div className={'bg-secondary rounded overflow-hidden p-2'}>
            <div className={'relative -top-2 -left-2 w-[calc(100%+1em)]'}>
                <img src={image} className={'object-cover max-h-[200px] w-full'} alt=""/>
            </div>
            <h4>{title}</h4>
            {description && <p>{description}</p>}
            <div className={'flex items-center'}><i className={'fa-regular fa-clock mr-1'}></i><span>{new Date(date).toLocaleString()}</span></div>
        </div>
    );
};

export default Task;