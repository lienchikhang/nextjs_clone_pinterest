import React from 'react'
import CreateBtn from './CreateBtn'
import SaveBtn from './SaveBtn'

const UserSave = () => {
    return (
        <div className='usersave__wrapper'>
            <div className='btn__section'>
                <CreateBtn />
                <SaveBtn />
            </div>

        </div>
    )
}

export default UserSave