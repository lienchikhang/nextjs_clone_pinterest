import axios from 'axios'
import React, { useState } from 'react'
import '../../styles/saveBtn.scss';

interface Props {
    imgId: number,
}

const SaveButton: React.FC<Props> = ({ imgId }) => {

    const [saved, setSaved] = useState<boolean>(false);

    const handleSave = async (imgId: number) => {
        if (saved) {
            return;
        }
        const rs = await axios.post(`/api/image/save/${imgId}`)
        console.log('rs in savebtn', rs)
        if (rs.status === 200) {
            setSaved(true);
        }
    }


    return (
        <button className={`saveBtn ${saved && 'saved'}`} onClick={() => handleSave(imgId)}>{saved ? 'Saved' : 'Save'}</button>
    )
}

export default SaveButton
