import {GET_ERRORS} from "./types";

export const setError = error => {
    return {
        type: GET_ERRORS,
        payload:error
    }
}