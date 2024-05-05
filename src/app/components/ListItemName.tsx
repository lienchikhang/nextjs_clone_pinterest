'use client';
import { ListItemText } from '@mui/material'
import cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const ListItemName = () => {

    const [fullName, setFullname] = useState('');

    useEffect(() => {
        setFullname(cookies.get('full_name') as string)
    }, [])


    return (
        <ListItemText primary={fullName} />
    )
}

export default ListItemName