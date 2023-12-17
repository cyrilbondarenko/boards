import React, {useEffect, useState} from 'react';
import {API} from "../../../api/API";
import {useAppSelector} from "../../../hooks/redux";
import Member from "./Member/Member";
import {useSnackbar} from "notistack";

const Members = () => {
    const { enqueueSnackbar } = useSnackbar();
    let [members, setMembers] = useState([]);
    let [roles, setRoles] = useState([]);
    let [invitedLogin, setInvitedLogin] = useState('');
    let boardId = useAppSelector(state => state.board.board.id);
    let role = useAppSelector(state => state.board.board.role);

    let getMembers = async () => {
        let response = await API.getMembers(boardId);
        setMembers(response);
    };

    let getRoles = async () => {
        let response = await API.getRoles();
        setRoles(response);
    };

    useEffect(() => {
        if (boardId) {
            getMembers();
            getRoles();
        }
    }, [boardId]);

    return (
        <div className={"mb-4"}>
            <strong className={"mb-2 block"}>Участники</strong>
            <div>
                {members && members.map((m: any) => <Member avatar={m.avatar} name={`${m.surname} ${m.name} ${m.middlename}`} position={m.position} id={m.id} roles={roles} roleId={m.roleId} boardId={boardId} updateMembers={getMembers} key={m.id}/>)}
            </div>
            {(role == 1 || role == 2) && <div className={'flex flex-col'}>
                <strong className={"mb-2"}>Пригласить нового участника</strong>
                <input type="text" className={"input mb-2"} placeholder={'Введите логин приглашаемого'} value={invitedLogin} onChange={(e) => {
                    setInvitedLogin(e.target.value);
                }}/>
                <button className={"button"} onClick={async () => {
                    let response = await API.newInvite(boardId, invitedLogin);
                    if (response.resultCode == 0) {
                        enqueueSnackbar(response.message, {variant: "success"});
                        setInvitedLogin('');
                    } else {
                        enqueueSnackbar(response.message, {variant: "error"});
                    }
                }}>Пригласить</button>
            </div>}
        </div>
    );
};

export default Members;