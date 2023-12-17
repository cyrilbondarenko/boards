import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import { API } from '../api/API';
import Board, {IBoard} from '../components/Board/Board';
import NewItem from '../components/UI/NewItem/NewItem';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Invites from "../components/Invites/Invites";
import {useSnackbar} from "notistack";
import {fetchBoards} from "../store/reducers/actionCreators";

const Boards = () => {

    let dispatch = useAppDispatch();
    let boards = useAppSelector(state => state.boards.boards);
    let [invites, setInvites] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    let addBoard = async (title: any) => {
        let response = await API.newBoard(title);
        enqueueSnackbar(response.message, {variant: "success"});
        dispatch(fetchBoards());
    }
    let getInvites = async () => {
        let data = await API.getInvites();
        setInvites(data);
    };

    useEffect(() => {
        dispatch(fetchBoards());
        getInvites();
    }, []);

    return (
        <section>
            <div className="container flex flex-col items-start">
                {invites.length ? <Invites items={invites} getInvites={getInvites}/> : null }
                <h1 className={"mb-4"}>Доступные доски</h1>
                {boards && <div className={'grid grid-cols-4 gap-4 mb-4 last:mb-0'}>
                    {boards.map((b: IBoard) => (
                        <NavLink to={`/board/${b.id}`} key={b.id}>
                            <Board id={b.id} title={b.title} description={b.description} image={b.image}/>
                        </NavLink>
                    ))}
                </div>}
                {boards == undefined && <div>
                    <p>There are no boards, but you can add it!</p>
                </div>}
                <NewItem name={'новую доску'} onSubmit={addBoard}/>
            </div>
        </section>
    );
};

export default Boards;