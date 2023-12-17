import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

interface INewItem {
    name: string
    onSubmit: (title: string) => void
}

const NewItem = ({name, onSubmit}: INewItem) => {
    let [isActive, setIsActive] = useState(false);
    let [title, setTitle] = useState('');
    let [error, setError] = useState('');

    let handleSubmit = () => {
        if (title.trim().length == 0) {
            setError('Название не может быть пустым');
        } else {
            onSubmit(title);
            setIsActive(!isActive);
            setTitle('');
            setError('');
        }
    }

    return (
        <div className={'flex flex-col'}>
            {!isActive ?
                <Button className={'button'} onClick={() => {setIsActive(!isActive)}}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    <span>Создать {name.toLowerCase()}</span>
                </Button>
                :
                <div className={"flex flex-col"}>
                    <Input className={'mb-2'} value={title} onChange={e => setTitle(e.target.value)}/>
                    {error && <span className={"text-red-600 text-sm mb-2"}>{error}</span>}
                    <div className={'flex items-center'}>
                        <Button className={'button mr-2'} onClick={handleSubmit}>
                            <i className="fa-solid fa-plus mr-2"></i>
                            <span>Создать</span>
                        </Button>
                        <button onClick={() => {setIsActive(!isActive)}}>
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default NewItem;