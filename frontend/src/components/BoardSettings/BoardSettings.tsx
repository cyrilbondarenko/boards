import React, {useEffect, useState} from 'react';
import {API, boardsAPI} from '../../api/API';
import {useAppSelector} from "../../hooks/redux";
import Members from "./Members/Members";
import ImageInput from "../UI/ImageInput/ImageInput";
import NewItem from "../UI/NewItem/NewItem";
import {useSnackbar} from "notistack";
import EditInput from "../UI/EditInput/EditInput";
import {useNavigate} from "react-router-dom";

interface IBoardSettings {
    updateBoard: any
}
const BoardSettings = ({updateBoard}: IBoardSettings) => {

    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();
    let board = useAppSelector(state => state.board.board);
    let role = useAppSelector(state => state.board.board.role);
    let updateTitle = async (title: string) => {
        let response = await API.updateTitle(board.id, title);
        enqueueSnackbar(response.message, {variant: "success"});
        updateBoard();
    }

    let updateDescription = async (description: string) => {
        let response = await API.updateDescription(board.id, description);
        enqueueSnackbar(response.message, {variant: "success"});
        updateBoard();
    }

    let [image, setImage] = useState<any>();

    return (
        <div className={'p-4 rounded bg-white'}>
            <h2>Настройки</h2>
            <div className={"mb-2"}>
                <strong>Название</strong>
                <EditInput type={'input'} initValue={board.title} onSubmit={updateTitle} className={''} editable={(role == 1 || role == 2)}/>
            </div>
            <div className={"mb-2"}>
                <strong>Описание</strong>
                <EditInput type={'textarea'} initValue={board.description} onSubmit={updateDescription} className={''} editable={(role == 1 || role == 2)}/>
            </div>
            <div className={"mb-2"}>
                <strong>Фото</strong>
                {(role == 1 || role == 2) ? <>
                    <ImageInput src={board.image} onChange={(event: any) => {
                        setImage(event.target.files[0]);
                    }}/>
                    <button className={"button w-[250px]"} onClick={async (e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append('image', image)
                        let response = await API.updateImage(board.id, formData);
                        enqueueSnackbar(response.message, {variant: "success"});
                        updateBoard();
                    }}>Сохранить</button>
                </> : <img src={board.image} alt="" className={"max-h-[250px] w-[250px] border-2 border-secondary object-cover"}/>}
            </div>
            <Members/>
            <button className={"button w-full last:mb-0 mb-4"} onClick={async () => {
                let response = await boardsAPI.leave(board.id);
                if (response.resultCode != 0) {
                    enqueueSnackbar(response.message, {variant: "error"});
                } else {
                    enqueueSnackbar(response.message, {variant: "success"});
                    navigate('/');
                }
            }}>Покинуть доску</button>
            {(role == 1) && <button className={"button w-full"} onClick={async () => {
                if (window.confirm('Вы уверены что хотите удалить доску? Это действие необратимо')) {
                    let response = await boardsAPI.delete(board.id);
                    enqueueSnackbar(response.message, {variant: "success"});
                    navigate('/');
                }
            }}>Удалить доску</button>}
        </div>
    );
};

export default BoardSettings;