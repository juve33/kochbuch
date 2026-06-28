import { createContext, useContext, type ActionDispatch } from 'react';

export type GlobalState = {
    username: string | null;
    modalsOpen: number;
};

type GlobalStateReducerAction =
    | { type: "set username", username: string | null }
    | { type: "open modal" }
    | { type: "close modal" }


export function globalStateReducer(state: GlobalState, action: GlobalStateReducerAction) {
    switch (action.type) {
        case "set username": {
            return {
                ...state,
                username: action.username,
            };
        }
        case "open modal": {
            return {
                ...state,
                modalsOpen: state.modalsOpen + 1,
            };
        }
        case "close modal": {
            return {
                ...state,
                modalsOpen: Math.max(state.modalsOpen - 1, 0),
            };
        }
    }
}

export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
export const GlobalStateDispatchContext = createContext<ActionDispatch<[action: GlobalStateReducerAction]> | undefined>(undefined);

export function useGlobalState() {
    const state = useContext(GlobalStateContext);

    if (state === undefined) {
        throw new Error("GlobalState is undefined");
    }

    return state;
}

export function useGlobalStateDispatch() {
    const state = useContext(GlobalStateDispatchContext);

    if (state === undefined) {
        throw new Error("GlobalStateDispatch is undefined");
    }

    return state;
}