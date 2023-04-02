import axios from 'axios';
import Config from "../config";

const LoanRecordApi = {

    getAllLoanRecords: (cb) => {
        axios.get(Config.API + '/library/branches/loans')
            .then(response => {
                cb(response.data);
            })
    },

    getLoanRecordsByBranch: (branchId, cb) => {
        axios.get(Config.API + '/library/branches/' + branchId + '/loans')
            .then(res => {
                cb(res.data);
            })
    },

    getLoanRecordsByUser: (userId, cb) => {
        axios.get(Config.API + '/users/' + userId + '/loans')
            .then(res => {
                cb(res.data);
            })
    },

    updateLoanRecord: (loanRecord, cb) => {
        axios.post(Config.API + '/library/branch/loan', loanRecord)
            .then(res => {
                cb(res.data);
            })
    },

    deleteLoanRecord: (loanRecordId, cb) => {
        axios.delete(Config.API + '/loanRecord?id=', loanRecordId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default LoanRecordApi;