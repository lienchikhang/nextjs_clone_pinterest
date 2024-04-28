'use client';

import React from 'react'
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const BackButton = () => {

    const navigate = useRouter();

    const handleClick = () => {
        navigate.push('/home');
    }

    return (
        <button onClick={handleClick} className='pin__btn-back'>
            <KeyboardBackspaceIcon />
            <span>For you</span>
        </button>
    )
}

export default BackButton