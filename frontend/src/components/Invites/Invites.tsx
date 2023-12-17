import React, {useEffect, useState} from 'react';
import {API} from "../../api/API";
import {useSnackbar} from "notistack";
import {useAppDispatch} from "../../hooks/redux";
import {fetchBoards} from "../../store/reducers/actionCreators";

interface IInvites {
    items: any
    getInvites: any
}
const Invites = ({items, getInvites}: IInvites) => {

    let dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <div className={"mb-4"}>
            <h2>Ваши приглашения:</h2>
            <div>
                {items.map((i: any) => (
                    <div className={"rounded bg-main text-white p-4 flex flex-col items-center"} key={i.id}>
                        <span className={"mb-2"}>Приглашение от {i.login} в доску "{i.title}"</span>
                        <div>
                            <button className={"button mr-2"} onClick={async (e) => {
                                e.preventDefault();
                                let response = await API.acceptInvite(i.id);
                                enqueueSnackbar(response.message, {variant: "success"});
                                getInvites();
                                dispatch(fetchBoards());
                            }}>Принять</button>
                            <button className={"button"} onClick={async (e) => {
                                e.preventDefault();
                                let response = await API.declineInvite(i.id);
                                enqueueSnackbar(response.message, {variant: "success"});
                                getInvites();
                                dispatch(fetchBoards());
                            }}>Отклонить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Invites;