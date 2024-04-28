import UserInfo from '@/app/components/UserInfo'
import React from 'react'
import '../../../styles/userPage.scss';
import UserSave from '@/app/components/UserSave';


const UserLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='userpage'>
            <div className='user__info'>
                <UserInfo />
            </div>
            <div className='user__saved'>
                <UserSave />
                {children}
            </div>
        </div>
    )
}

export default UserLayout