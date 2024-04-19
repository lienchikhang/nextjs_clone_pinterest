import { createContext } from "react";
import { Action, State, initialState } from "./store";

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}


export const Context = createContext<[State, React.Dispatch<Action>]>([initialState, () => { }]);