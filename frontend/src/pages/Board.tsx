import React, {useEffect} from 'react';
import {NavLink, Route, Routes, useParams} from "react-router-dom";
import Blocks from '../components/Blocks/Blocks';
import Popup from '../components/Popup/Popup';
import Task from '../components/Task/Task';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useAppDispatch} from "../hooks/redux";
import BoardSettings from "../components/BoardSettings/BoardSettings";
import {fetchBoard} from "../store/reducers/actionCreators";

const Board = () => {

    let dispatch = useAppDispatch();

    let {boardId} = useParams();

    let board = useSelector((state:RootState) => state.board.board);

    let updateBoard = async () => {
        dispatch(fetchBoard(boardId));
    };

    useEffect(() => {
        updateBoard();
    }, []);

    return (
        <>
            <Routes>
                <Route path={'settings'} element={<Popup>
                    <BoardSettings updateBoard={updateBoard}/>
                </Popup>}/>
                <Route path={'tasks/:taskId'} element={<Popup>
                    {board && <Task updateBoard={updateBoard}/>}
                </Popup>}/>
            </Routes>
            <section className={'board px-4 flex flex-col'}>
                <div className={'flex items-center justify-between mb-2'}>
                    <h2>{board.id ? board.title : <span className={'text-red-600'}>У вас нет доступа к этой доске</span>}</h2>
                    {board.id && <NavLink to={'settings'}><button className={'button'}>Настройки <i className={'fa-solid fa-gear'}></i></button></NavLink>}
                </div>
                <Blocks items={board.blocks} getBoard={updateBoard}/>
            </section>
        </>
    );
};

export default Board;