'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

const ButtonCreate = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/create');
    }

    return (
        <button onClick={handleClick}>Create</button>
    )
}

export default ButtonCreate