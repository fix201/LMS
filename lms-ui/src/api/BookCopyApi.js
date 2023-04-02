import axios from 'axios';
import Config from "../config";

const LoanRecordApi = {

    getBookCopiesForBranch: (branchId, bookId, cb) => {
        axios.get(Config.API + '/library/branches/'+branchId+'/books/'+bookId+'/amount')
            .then(res => {
                cb(res.data);
            })
    },

    getBooksByBranch: (branchId, cb) => {
        axios.get(Config.API + '/library/branches/'+branchId+'/loans')
            .then(res => {
                cb(res.data);
            })
    },

    deleteBookFromBranch: (bookCopy, cb) => {
        axios.delete(Config.API + 'library/branch/book', bookCopy)
            .then(res => {
                cb(res.data);
            })
    }
};

export default LoanRecordApi;