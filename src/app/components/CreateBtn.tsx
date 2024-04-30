'use client';
import { Context } from '@/redux/context';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';


const CreateBtn = () => {

    const [payload, dispatch] = useContext(Context);
    const [clicked, setClicked] = useState(payload.activeBtn == 'create');
    const navigate = useRouter();

    const handleClick = () => {
        setClicked(true);
        dispatch({
            payload: 'create',
            type: 'setActiveButton'
        });
        navigate.push('create')

    }

    return (
        <button onClick={handleClick} className={`${clicked && 'active'}`}>Create</button>
    )
}

export default CreateBtn