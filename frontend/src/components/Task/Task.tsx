import React, {useEffect, useState} from 'react';
import Attachment, {IAttachment} from "./Attachment/Attachment";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import {API, tasksAPI} from "../../api/API";
import {setTask} from "../../store/reducers/taskSlice";
import ImageInput from "../UI/ImageInput/ImageInput";
import {IBlock} from "../Blocks/Block/Block";
import {useSnackbar} from "notistack";
import {fetchTask} from "../../store/reducers/actionCreators";
import EditInput from "../UI/EditInput/EditInput";

interface ITask {
    updateBoard: any
}
const Task = ({updateBoard}: ITask) => {

    let dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();
    let {taskId} = useParams();

    let data = useAppSelector(state => state.task.task);
    let blocks = useAppSelector(state => state.board.board.blocks);
    let role = useAppSelector(state => state.board.board.role);

    let [attachments, setAttachments] = useState<any>();
    let [isImageEditing, setIsImageEditing] = useState(false);
    let [image, setImage] = useState<any>();
    let [block, setBlock] = useState<string|number>(0);

    let getTask = async () => {
        dispatch(fetchTask(taskId));
    };

    let updateImage = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        let response = await tasksAPI.updateImage(taskId, formData);
        setIsImageEditing(false);
        enqueueSnackbar(response.message, {variant: "success"});
        updateBoard();
        getTask();
    };

    let updateTitle = async (title: string) => {
        let response = await tasksAPI.updateTitle(taskId, title);
        enqueueSnackbar(response.message, {variant: "success"});
        updateBoard();
        getTask();
    }

    let updateDescription = async (description: string) => {
        let response = await tasksAPI.updateDescription(taskId, description);
        enqueueSnackbar(response.message, {variant: "success"});
        updateBoard();
        getTask();
    }

    useEffect(() => {
        (blocks && blocks.length > 1) && setBlock(blocks[0].id != data.block_id ? blocks[0].id : blocks[1].id);
    }, [blocks, data.id]);

    useEffect(() => {
        getTask();
    }, []);

    return (
        <div className={'p-4 rounded bg-white w-[350px]'}>
            <div className={'mb-4'}>
                {!isImageEditing ? <div>
                    <img src={data.image} alt="" className={"w-full mb-2"}/>
                    {(role == 1 || role == 2) && <button className={"button w-full"} onClick={() => {
                        setIsImageEditing(true);
                    }}>Изменить изображение</button>}
                </div> : <div className={"flex flex-col"}>
                    <ImageInput className={"w-full"} src={data.image} onChange={(e: any) => {
                        setImage(e.target.files[0]);
                    }}/>
                    <button className={"button mb-2"} onClick={updateImage}>Сохранить</button>
                    <button className={"button"} onClick={() => {
                        setIsImageEditing(false);
                    }}>Отмена</button>
                </div>}
            </div>
            <EditInput type={'input'} initValue={data.title} fontSize={20} onSubmit={updateTitle} className={'mb-4'}  editable={(role == 1 || role == 2)}/>
            <div className={'mb-4'}>
                <div className={'flex items-center mb-2'}>
                    <i className="fa-solid fa-align-justify mr-2"></i>
                    <span>Описание</span>
                </div>
                <EditInput type={'textarea'} initValue={data.description} onSubmit={updateDescription} editable={(role == 1 || role == 2)}/>
            </div>
            {blocks && blocks.length > 1 && (role == 1 || role == 2) && <div className={"flex flex-col mb-4"}>
                <span className={"mb-2"}><i className={"fa-solid fa-arrow-up-right-from-square mr-2"}></i>Переместить задачу в другой блок</span>
                <select className={"input mb-2"} onChange={(e) => {
                    setBlock(e.target.value);
                }}>
                    {blocks.map((b: any) => (b.id != data.block_id && <option value={b.id} key={b.id}>{b.title}</option>))}
                </select>
                <button className={"button"} onClick={async () => {
                    let response = await tasksAPI.moveTask(taskId, block);
                    enqueueSnackbar(response.message, {variant: "success"});
                    updateBoard();
                    navigate('..');
                    getTask();
                }}>Переместить</button>
            </div>}
            <div className={"mb-4"}>
                <div className={'flex items-center mb-2'}>
                    <i className="fa-solid fa-paperclip mr-2"></i>
                    <span>Вложения</span>
                </div>
                {(role == 1 || role == 2) && <form className={'flex flex-col mb-2'} onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('taskId', taskId ? taskId : '')
                    for (const key of Object.keys(attachments)) {
                        formData.append('attachments', attachments[key])
                    }
                    let response = await API.newAttachments(formData);
                    enqueueSnackbar(response.message, {variant: "success"});
                    getTask();
                }}>
                    <span>Добавить вложения</span>
                    <input type="file" className={"mb-2"} multiple={true} onChange={(event: any) => {
                        setAttachments(event.target.files);
                    }}/>
                    <button className={"button"}>Загрузить</button>
                </form>}
                <div>
                    {data.attachments && data.attachments.map((a: any) => <Attachment id={a.id} title={a.title} type={a.type} date={a.date} path={a.path} key={a.id} updateTask={getTask}/>)}
                </div>
            </div>
            {(role == 1 || role == 2) && <button className="button w-full" onClick={async () => {
                let response = await tasksAPI.deleteTask(taskId);
                enqueueSnackbar(response.message, {variant: "success"});
                updateBoard();
                navigate('..');
            }}>Удалить задачу</button>}
        </div>
    );
};

export default Task;