export const initialState = {
    modal: {
        isOpen: false,
    }
}

export interface State {
    modal: {
        isOpen: boolean,
    }
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
        default: {
            return state;
        }
    }
}

export default reducer;