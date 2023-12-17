import React from 'react';
import Task from './Task/Task';
import {ITask} from "./Task/Task";
import {NavLink} from "react-router-dom";

interface ITasks {
    items: Array<ITask>
}

const Tasks = ({items}: ITasks) => {
    return (
        <div className={'max-w-full overflow-auto max-h-full h-full mb-2 rounded flex flex-col gap-2'}>
            {items &&
                items.map(i => <NavLink to={`tasks/${i.id}`} key={i.id}><Task title={i.title} image={i.image} description={i.description} id={i.id} date={i.date} key={i.id}/></NavLink>)
            }
        </div>
    );
};

export default Tasks;