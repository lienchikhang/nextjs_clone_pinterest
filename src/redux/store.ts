import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

console.log('dadwdawd', Cookies.get('avatar'))

export const initialState = {
    modal: {
        isOpen: false,
    },
    // user: {
    //     full_name: Cookies.get('full_name') ? Cookies.get('full_name') : '',
    //     avatar: Cookies.get('avatar') != null ? Cookies.get('avatar') : ''
    // },
    isLoading: false,
    activeBtn: 'save',
    search: '',
    menu: false,
}

export interface State {
    modal: {
        isOpen: boolean,
    },
    // user: {
    //     full_name: string,
    //     avatar: string,
    // },
    isLoading: boolean,
    activeBtn: string,
    search: string,
    menu: boolean,
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
        // case 'updateUser': {
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             full_name: action.payload.full_name,
        //             avatar: action.payload.avatar
        //         },

        //     }
        // }
        case 'toggleLoading': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case 'setActiveButton': {
            return {
                ...state,
                activeBtn: action.payload
            }
        }
        case 'addQuery': {
            return {
                ...state,
                search: action.payload
            }
        }
        case 'toggleMenu': {
            return {
                ...state,
                menu: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;