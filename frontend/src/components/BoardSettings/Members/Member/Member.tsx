import React, {useState} from 'react';
import {API, boardsAPI} from "../../../../api/API";
import {useAppSelector} from "../../../../hooks/redux";
import {useSnackbar} from "notistack";

interface IMember {
    id: number
    avatar: string
    name: string
    roles: any
    roleId: number
    boardId: number
    updateMembers: any
    position?: string
}

const Member = ({avatar, name, id, position, roles, roleId, boardId, updateMembers}: IMember) => {
    const { enqueueSnackbar } = useSnackbar();
    let role = roles.filter((r: any) => r.id == roleId)[0];
    let userId = useAppSelector(state => state.auth.auth.id);
    let userRole = useAppSelector(state => state.board.board.role);

    let [isEditing, setIsEditing] = useState(false);
    let [selectedRole, setSelectedRole] = useState(role);

    return (
        <div className={"mb-2"}>
            <div className={"flex items-center justify-between w-[450px]"}>
                <div className={'flex items-center'}>
                    <div className={"mr-4"}>
                        <img src={avatar} className={'object-cover w-[50px] h-[50px]'}/>
                    </div>
                    <div className={"flex flex-col mr-4"}>
                        <span>{name}</span>
                        {position && <span>{position}</span>}
                        <div>
                            {!isEditing ? <>
                                <span className={"mr-2"}>{role && role.title}</span>
                                {(userRole == 1) && <button onClick={() => setIsEditing(true)}><i className={"fa-solid fa-edit"}></i></button>}
                            </> : <div>
                                <select className={"input mr-2"} value={selectedRole.id} onChange={(e) => {
                                    setSelectedRole(roles.filter((r: any) => r.id == e.target.value)[0]);
                                }
                                }>
                                    {roles.map((m: any) => (<option value={m.id} key={m.id}>{m.title}</option>))}
                                </select>
                                <button className={"mr-2"} onClick={async () => {
                                    let response = await API.updateRole(boardId, id, selectedRole.id);
                                    enqueueSnackbar(response.message, {variant: "success"});
                                    updateMembers();
                                    setIsEditing(false);
                                }}>
                                    <i className={"fa-solid fa-check"}></i>
                                </button>
                                <button onClick={() => setIsEditing(false)}><i className={"fa-solid fa-close"}></i></button>
                            </div>}
                        </div>
                    </div>
                </div>
                {(userRole == 1 && userId != id) && <button className={"button"} onClick={async () => {
                    let response = await boardsAPI.kick(boardId, id);
                    enqueueSnackbar(response.message, {variant: "success"});
                    updateMembers();
                }}>Выгнать</button>}
            </div>
        </div>
    );
};

export default Member;