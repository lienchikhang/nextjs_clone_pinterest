import React from 'react'
import UploadSection from './UploadSection'
import '../../styles/upload.scss'

const CreateSection = () => {
    return (
        <div className='create__wrapper'>
            <div className='create__heading'>
                <h2>Create Pin</h2>
            </div>
            <div className='create__body'>
                <UploadSection />
            </div>
        </div>
    )
}

export default CreateSection