import axios from 'axios';
import Config from "../config";

const LibraryBranchApi = {
    getAllLibraryBranches: function (cb) {
        axios.get(Config.api + '/library/branches')
            .then(res => {
                cb(res.data);
            })
    },

    getLibraryBranch: async function (libraryBranchId) {
        return await axios.get(Config.api + '/library/branches/' + libraryBranchId);
    },

    updateLibraryBranch: (libraryBranch, cb)=> {
        axios.post(Config.api + '/library/branch', libraryBranch)
            .then(res => {
                cb(res.data);
            })
    },

    deleteLibraryBranch: (libraryBranchId, cb) => {
        axios.delete(Config.api + '/library/branch?id=', libraryBranchId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default LibraryBranchApi;