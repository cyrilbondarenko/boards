import React from 'react';
import {tasksAPI} from "../../../api/API";
import PDFIcon from "./../../../assets/images/file-icons/pdf.svg";
import ArchiveIcon from "./../../../assets/images/file-icons/archive.svg";
import DocumentIcon from "./../../../assets/images/file-icons/doc.svg";
import FileIcon from "./../../../assets/images/file-icons/file.svg";
import ExcelIcon from "./../../../assets/images/file-icons/excel.svg";
import TxtIcon from "./../../../assets/images/file-icons/txt.svg";
import VideoIcon from "./../../../assets/images/file-icons/video.svg";
import {useSnackbar} from "notistack";
import {useAppSelector} from "../../../hooks/redux";

export interface IAttachment {
    id: number
    title: string
    path: string
    date: number
    type: string
    updateTask: any
}

const Attachment = ({id, title, path, date, type, updateTask}: IAttachment) => {

    let image;
    const { enqueueSnackbar } = useSnackbar();
    let role = useAppSelector(state => state.board.board.role);

    switch(type){
        case "jpg":
        case "png":
        case "webp":
        case "svg":
            image = path;
            break;
        case "pdf":
            image = PDFIcon;
            break;
        case "docx":
        case "rtf":
            image = DocumentIcon;
            break;
        case "xls":
            image = ExcelIcon;
            break;
        case "txt":
            image = TxtIcon;
            break;
        case "zip":
            image = ArchiveIcon;
            break;
        case "mp4":
            image = VideoIcon;
            break;
        default:
            image = FileIcon;
            break;
    }

    return (
        <div className={'flex items-center mb-2'}>
            <a className={'min-w-[75px] w-[75px] max-h-[75px] mr-2'} href={path} download={title}>
                <img src={image} alt=""/>
            </a>
            <div className="">
                <h3>{title}</h3>
                <span>{new Date(date).toLocaleString('ru-RU')}</span>
                <img src="/assets/images/file-icons/pdf.svg" alt=""/>
                {(role == 1 || role == 2) && <div>
                    <button className={"button"} onClick={async (e) => {
                        let response = await tasksAPI.deleteAttachment(id);
                        enqueueSnackbar(response.message, {variant: "success"});
                        updateTask();
                    }}>Удалить</button>
                </div>}
            </div>
        </div>
    );
};

export default Attachment;