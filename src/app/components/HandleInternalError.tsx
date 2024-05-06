import React from 'react'
import '../../styles/error.scss';

interface Props {
    mess: string
}

const HandleInternalError: React.FC<Props> = ({ mess }) => {
    return (
        <div className='error__wrapper'>
            <div>
                <h1>{mess}</h1>
                <p>Please reload the website, or contact <a>pin_service@contact.com</a></p>
            </div>
        </div>
    )
}

export default HandleInternalError