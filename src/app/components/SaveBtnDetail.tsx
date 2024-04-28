'use client';

import axios from 'axios';
import React, { useState } from 'react'
import '../../styles/saveBtn.scss';

interface Props {
    imgId: number,
    isSaved: boolean,
}

const SaveBtnDetail: React.FC<Props> = ({ imgId, isSaved }) => {

    const [saved, setSaved] = useState<boolean>(isSaved);


    const handleSave = async (imgId: number) => {
        if (saved) {
            return;
        }
        const rs = await axios.post(`/api/image/save/${imgId}`)
        if (rs.status === 200) {
            setSaved(true);
        }
    }


    return (
        <button className={`saveBtn ${saved && 'saved'}`} onClick={() => handleSave(imgId)}>{saved ? 'Saved' : 'Save'}</button>
    )

}

export default SaveBtnDetail