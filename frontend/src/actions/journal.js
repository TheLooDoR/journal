import {SET_JOURNAL_DATA} from "./types";

export const setJournalData = journalData => {
    return {
        type: SET_JOURNAL_DATA,
        payload: journalData
    }
}
