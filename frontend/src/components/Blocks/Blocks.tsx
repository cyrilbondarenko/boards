import React from 'react';
import NewItem from '../UI/NewItem/NewItem';
import Block, {IBlock} from "./Block/Block";
import {API, blocksAPI} from "../../api/API";
import {useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useAppSelector} from "../../hooks/redux";

interface IBlocks {
    items: Array<IBlock>
    getBoard: any
}

const Blocks = ({items, getBoard}: IBlocks) => {

    let {boardId} = useParams();
    const { enqueueSnackbar } = useSnackbar();

    let role = useAppSelector(state => state.board.board.role);

    let addBlock = async (title: any) => {
        let response = await API.newBlock(title, boardId);
        enqueueSnackbar(response.message, {variant: "success"});
        getBoard();
    }

    let deleteBlock = async (id: any) => {
        let response = await blocksAPI.delete(id);
        enqueueSnackbar(response.message, {variant: "success"});
        getBoard();
    }

    return (
        <div className={'flex items-start gap-2 flex-grow overflow-auto'}>
            {items && items.map(i => <Block title={i.title} tasks={i.tasks} id={i.id} getBoard={getBoard} deleteBlock={deleteBlock} key={i.id}/>)}
            {(role == 1 || role == 2) && <NewItem name={'блок'} onSubmit={addBlock}/>}
        </div>
    );
};

export default Blocks;