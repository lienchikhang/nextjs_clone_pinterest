'use client';

import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Context } from '@/redux/context';

const SearchBar = () => {
    const [state, dispatch] = useContext(Context);


    const handleSearch = () => {
        if (state.modal.isOpen) return;
        dispatch({
            payload: true,
            type: 'toggleSearchModal'
        })
    }

    const handleHideSearch = () => {
        dispatch({
            payload: false,
            type: 'toggleSearchModal'
        })
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            console.log('send', e.currentTarget.value)
            dispatch({
                type: 'addQuery',
                payload: `qName=${e.currentTarget.value}`
            })
            dispatch({
                payload: false,
                type: 'toggleSearchModal'
            })
        }
    }

    return (
        <React.Fragment>
            <SearchIcon />
            <input onKeyDown={handleEnter} onClick={handleSearch} type="text" placeholder='Search' />
            <CancelIcon onClick={handleHideSearch} className={`${state.modal.isOpen && 'active'}`} />
        </React.Fragment>
    )
}

export default SearchBar