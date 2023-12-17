import React from 'react';

export interface IBoard {
    id: number
    title: string
    description: string
    image?: string
}

const Board = ({id, title, description, image}: IBoard) => {
    return (
        <div className={'bg-main py-4 px-4 rounded shadow-secondary shadow-md overflow-hidden'}>
            {image && <div className={'w-[calc(100%+2rem)] relative -left-4 -top-4'}>
                <img src={image} alt=""/>
            </div>}
            <span className={'block mb-2 text-white font-bold text-xl last:mb-0'}>{title}</span>
            {description && <p className={'block text-white'}>{description}</p>}
        </div>
    );
};

export default Board;