import { types } from "../types/types";

export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({
    type: types.uiRemoveError
})

//    uiStartLoading: debe de colocar la propiedad loading en true 
//    uiFinishLoading: debe de colocar la propiedad loading en false

export const startLoading = () => ({
    type: types.uiStartLoading,
    payload: true
})

export const finishLoading = () => ({
    type: types.uiFinishLoading,
    payload: false
})