'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

const ButtonHome = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    }

    return (
        <button className='active' onClick={handleClick}>Home</button>
    )
}

export default ButtonHome