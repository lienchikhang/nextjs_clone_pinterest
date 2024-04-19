import React, { useReducer } from 'react'
import reducer, { initialState } from './store';
import { Context } from './context';

interface Props {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider