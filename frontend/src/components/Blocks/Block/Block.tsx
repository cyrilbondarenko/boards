import React, {useState} from 'react';
import Tasks from "./Tasks/Tasks";
import {ITask} from "./Tasks/Task/Task";
import NewItem from '../../UI/NewItem/NewItem';
import {API, blocksAPI} from "../../../api/API";
import {useSnackbar} from "notistack";
import {useAppSelector} from "../../../hooks/redux";
import EditInput from "../../UI/EditInput/EditInput";

export interface IBlock {
    id: number
    title: string
    tasks: Array<ITask>
    getBoard: any
    deleteBlock: any
}

const Block = ({title, tasks, id, getBoard, deleteBlock}: IBlock) => {

    const { enqueueSnackbar } = useSnackbar();

    let role = useAppSelector(state => state.board.board.role);

    let addTask = async (title: string) => {
        let response = await API.newTask(title, id);
        enqueueSnackbar(response.message, {variant: "success"});
        getBoard();
    }

    let updateTitle = async (title: any) => {
        let response = await API.updateBlockTitle(id, title);
        enqueueSnackbar(response.message, {variant: "success"});
        getBoard();
    }

    return (
        <div className={'min-w-[300px] w-[300px] max-h-full flex flex-col p-2 rounded border-main border-2'}>
            <div className={'flex items-center justify-between mb-2'}>
                <EditInput type={'input'} initValue={title} onSubmit={updateTitle} className={'w-full mr-2'} editable={(role == 1 || role == 2)}/>
                {(role == 1 || role == 2) && <button>
                    <i className="fa-solid fa-trash" onClick={async () => {
                        await deleteBlock(id);
                    }}></i>
                </button>}
            </div>
            <Tasks items={tasks}/>
            {(role == 1 || role == 2) && <NewItem name={'задачу'} onSubmit={addTask}/>}
        </div>
    );
};

export default Block;