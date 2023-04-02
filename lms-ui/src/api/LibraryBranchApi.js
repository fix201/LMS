import axios from 'axios';
import Config from "../config";

const LibraryBranchApi = {
    getAllLibraryBranches: function (cb) {
        axios.get(Config.API + '/library/branches')
            .then(res => {
                cb(res.data);
            })
    },

    getLibraryBranch: async function (libraryBranchId) {
        return await axios.get(Config.API + '/library/branches/' + libraryBranchId);
    },

    updateLibraryBranch: (libraryBranch, cb)=> {
        axios.post(Config.API + '/library/branch', libraryBranch)
            .then(res => {
                cb(res.data);
            })
    },

    deleteLibraryBranch: (libraryBranchId, cb) => {
        axios.delete(Config.API + '/library/branch?id=', libraryBranchId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default LibraryBranchApi;