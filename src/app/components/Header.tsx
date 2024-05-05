import React from 'react'
import ButtonHome from './ButtonHome'
import ButtonCreate from './ButtonCreate'
import SearchBar from './SearchBar'
import ModalSearch from './ModalSearch'
import NotiAction from './NotiAction'
import MessAction from './MessAction'
import AvatarAction from './AvatarAction'
import '../../styles/home.scss'
import Logo from './Logo'
import ButtonSelect from './ButtonSelect';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material'
import DrawerMenu from './DrawerMenu'
import MenuAction from './MenuAction'

const Header = () => {
    return (
        <header>
            <section className="header__logo">
                <Logo />
            </section>
            <section className='header__button'>
                <ButtonHome />
                <ButtonCreate />
            </section>
            <section className='header__button-mobile'>
                <ButtonSelect />
            </section>
            <section className='header__search'>
                <SearchBar />
                <ModalSearch />
            </section>
            <section className='header__actions'>
                <NotiAction />
                <MessAction />
                <AvatarAction />
            </section>
            <section className='header__menu'>
                <MenuAction />
                <DrawerMenu />
            </section>
        </header>
    )
}

export default Header