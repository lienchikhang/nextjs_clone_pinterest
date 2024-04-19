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
            <section className='header__search'>
                <SearchBar />
                <ModalSearch />
            </section>
            <section className='header__actions'>
                <NotiAction />
                <MessAction />
                <AvatarAction />
            </section>
        </header>
    )
}

export default Header