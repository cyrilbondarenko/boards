import React, {useState} from 'react';
import classNames from "classnames";
import {useSnackbar} from "notistack";

interface IEditInput {
    type: string
    initValue: string
    onSubmit: any
    className?: string
    editable?: boolean
    fontSize?: number
}

const EditInput = ({type, initValue, onSubmit, className, editable = true, fontSize = 16}: IEditInput) => {

    const { enqueueSnackbar } = useSnackbar();

    let [isEditing, setIsEditing] = useState(false);
    let [value, setValue] = useState(initValue);

    let handleSubmit = () => {
        if (value.trim().length != 0) {
            onSubmit(value);
            setIsEditing(false);
        } else {
            enqueueSnackbar('Поле не может быть пустым', {variant: "error"});
        }
    };

    return (
        <div className={classNames('flex items-center', className)}>
            {isEditing ? <>
                <div className={'mr-2 w-full'}>
                    {type == 'input' ?
                        <input type={"text"} className={`input w-full`} style={{fontSize}} value={value} onChange={(e) => setValue(e.currentTarget.value)}/> :
                        <textarea className={"input resize-none w-full"} value={value} onChange={(e) => setValue(e.currentTarget.value)}></textarea>
                    }
                </div>
                <div className={'flex justify-between'}>
                    <button className={'mr-2'}>
                        <i className="fa-solid fa-check" onClick={handleSubmit}></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-close" onClick={() => {
                            setIsEditing(false);
                            setValue(initValue);
                        }}></i>
                    </button>
                </div>
            </> : <>
                <span className={"mr-2"} style={{fontSize}}>{initValue}</span>
                {editable && <button>
                    <i className="fa-solid fa-edit" onClick={() => {
                        setValue(initValue);
                        setIsEditing(true);
                    }}></i>
                </button>}
            </>}
        </div>
    );
};

export default EditInput;