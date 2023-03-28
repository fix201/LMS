
import LoanRecordApi from '../api/LoanRecordApi';
import Dispatcher from '../dispatcher/appDispatcher';

const LoanRecordsActions = {
    readLoanRecords: function () {
        LoanRecordApi.getAllLoanRecords((loanRecordList) => {
            Dispatcher.dispatch({
                actionType: 'read_loanRecords',
                data: loanRecordList
            })
        })
    },

    deleteLoanRecord: (loanRecordId) => {
        LoanRecordApi.deleteLoanRecord(loanRecordId, (res) => {
            Dispatcher.dispatch({
                actionType: 'delete_loanRecord',
                status: res
            })
        })
    },

    updateLoanRecord: (loanRecord) => {
        LoanRecordApi.updateLoanRecord(loanRecord, (res) => {
            Dispatcher.dispatch({
                actionType: 'update_loanRecord',
                status: res
            })
        })
    }

}

export default LoanRecordsActions;