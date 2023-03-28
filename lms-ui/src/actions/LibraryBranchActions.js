
import LibraryBranchApi from '../api/LibraryBranchApi';
import Dispatcher from '../dispatcher/appDispatcher';

const LibraryBranchsActions = {
    readLibraryBranchs: function () {
        LibraryBranchApi.getAllLibraryBranchs((libraryBranchList) => {
            Dispatcher.dispatch({
                actionType: 'read_libraryBranchs',
                data: libraryBranchList
            })
        })
    },

    deleteLibraryBranch: (libraryBranchId) => {
        LibraryBranchApi.deleteLibraryBranch(libraryBranchId, (res) => {
            Dispatcher.dispatch({
                actionType: 'delete_libraryBranch',
                status: res
            })
        })
    },

    updateLibraryBranch: (libraryBranch) => {
        LibraryBranchApi.updateLibraryBranch(libraryBranch, (res) => {
            Dispatcher.dispatch({
                actionType: 'update_libraryBranch',
                status: res
            })
        })
    }

}

export default LibraryBranchsActions;