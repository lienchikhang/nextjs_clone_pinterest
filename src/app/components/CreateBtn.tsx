'use client';
import { Context } from '@/redux/context';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';


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
        navigate.push(`/home/${Cookies.get('full_name')}/create`)

    }

    return (
        <button onClick={handleClick} className={`${clicked && 'active'}`}>Create</button>
    )
}

export default CreateBtn