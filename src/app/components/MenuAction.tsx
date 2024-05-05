'use client';
import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Context } from '@/redux/context';

const MenuAction = () => {

    const [state, dispatch] = useContext(Context);


    const handleClick = () => {
        dispatch({
            type: 'toggleMenu',
            payload: true,
        })
    }

    return (
        <MenuIcon className='cursor-pointer ' onClick={handleClick} />
    )
}

export default MenuAction