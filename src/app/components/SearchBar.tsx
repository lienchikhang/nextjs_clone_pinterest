'use client';

import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Context } from '@/redux/context';

const SearchBar = () => {
    const [state, dispatch] = useContext(Context);

    const handleSearch = () => {
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

    return (
        <React.Fragment>
            <SearchIcon />
            <input onClick={handleSearch} type="text" placeholder='Search' />
            <CancelIcon onClick={handleHideSearch} className={`${state.modal.isOpen && 'active'}`} />
        </React.Fragment>
    )
}

export default SearchBar