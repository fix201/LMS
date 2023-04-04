import axios from 'axios';
import {READ_LOAN_RECORDS, UPDATE_LOAN_RECORD} from "./ActionTypes";
import Config from "../config";
import {parseISO, format} from 'date-fns';

const formatDateFields = (loanData) => {
    const dateFormat = 'yyyy-MM-dd HH:mm:ss';
    return {
        ...loanData,
        loanDate: format(parseISO(loanData.loanDate), dateFormat),
        dueDate: format(parseISO(loanData.dueDate), dateFormat),
        dateIn: loanData?.dateIn ? format(parseISO(loanData.dateIn), dateFormat) : ""
    };
};

export const fetchLoanRecords = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/library/branches/loans`)
            .then((res) => {
                const formattedLoanRecords = res.data.map((loanRecord) => formatDateFields(loanRecord));
                dispatch({type: READ_LOAN_RECORDS, payload: formattedLoanRecords});
            })
            .catch(err => {
                console.error("Error fetching loanRecords:", err)
            });
    }
}

export const updateLoanRecord = (loanRecord) => {
    return (dispatch) => {
        axios.post(`${Config.API}/library/branch/loan/checkin`, loanRecord)
            .then((res) => {
                dispatch({type: UPDATE_LOAN_RECORD, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating loanRecord:", err)
            });
    }
}