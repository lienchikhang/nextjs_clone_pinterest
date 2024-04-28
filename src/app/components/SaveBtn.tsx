'use client';
import { Context } from '@/redux/context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const SaveBtn = () => {

    const [payload, dispatch] = useContext(Context);
    const [clicked, setClicked] = useState(payload.activeBtn == 'save');
    const navigate = useRouter();

    useEffect(() => {
        setClicked(payload.activeBtn == 'save')
    }, [payload])

    const handleClick = () => {
        setClicked(true);
        dispatch({
            payload: 'save',
            type: 'setActiveButton'
        });
        navigate.back()
    }

    return (
        <button onClick={handleClick} className={`${clicked && 'active'}`}>Save</button>
    )

}

export default SaveBtn