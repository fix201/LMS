import Dispatcher from '../dispatcher/appDispatcher';
import { EventEmitter } from 'events';

let _loanRecordStore = {
    loanRecords: []
};

class LoanRecordStoreClass extends EventEmitter {

    addChangeListener(cb, LoanRecordEvent) {
        this.on(LoanRecordEvent, cb);
    }

    removeChangeListener(cb, LoanRecordEvent) {
        this.removeListener(LoanRecordEvent, cb);
    }

    emitChange(LoanRecordEvent) {
        this.emit(LoanRecordEvent);
    }

    getAllLoanRecords() {
        return _loanRecordStore.loanRecords;
    }

}

const LoanRecordStore = new LoanRecordStoreClass();

Dispatcher.register((action) => {

    switch (action.actionType) {
        case 'read_loanRecords':
            _loanRecordStore.loanRecords = action.data;
            LoanRecordStore.emitChange('LoanRecordChange');
            break;
        case 'delete_loanRecord':
            _loanRecordStore.loanRecords = action.data;
            LoanRecordStore.emitChange('LoanRecordEdit');
            break;
        case 'update_loanRecord':
            _loanRecordStore.loanRecords = action.data;
            LoanRecordStore.emitChange('LoanRecordEdit');
            break;
        case 'add_loanRecord':
            _loanRecordStore.loanRecords = action.data;
            LoanRecordStore.emitChange('LoanRecordEdit');
            break;
        default:
            return;
    }
});

export default LoanRecordStore;