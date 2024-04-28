import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

console.log('dadwdawd', Cookies.get('avatar'))

export const initialState = {

    modal: {
        isOpen: false,
    },
    user: {
        full_name: Cookies.get('full_name') ? Cookies.get('full_name') : '',
        avatar: Cookies.get('avatar') != null ? Cookies.get('avatar') : ''
    },
    activeBtn: 'save'
}

export interface State {
    modal: {
        isOpen: boolean,
    },
    user: {
        full_name: string,
        avatar: string,
    },
    activeBtn: string,
}

export interface Action {
    payload?: any
    type: string
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'toggleSearchModal': {
            return {
                ...state,
                modal: {
                    isOpen: action.payload
                }
            }
        }
        case 'updateUser': {
            return {
                ...state,
                user: {
                    ...state.user,
                    full_name: action.payload.full_name,
                    avatar: action.payload.avatar
                },

            }
        }
        case 'setActiveButton': {
            return {
                ...state,
                activeBtn: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;