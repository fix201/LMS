import {EventEmitter} from 'events';

let _authorStore = {
  authors: []
};

class AuthorStoreClass extends EventEmitter{

    addChangeListener(cb, AuthorEvent){
        this.on(AuthorEvent, cb);
    }

    removeChangeListener(cb, AuthorEvent){
        this.removeListener(AuthorEvent, cb);
    }

    emitChange(AuthorEvent){
        this.emit(AuthorEvent);
    }

    getAllAuthors(){
        return _authorStore.authors;
    }

}

const AuthorStore = new AuthorStoreClass();

// Dispatcher.register( (action) => {
//
//     switch (action.actionType){
//         case 'read_authors':
//             _authorStore.authors = action.data;
//             AuthorStore.emitChange('AuthorChange');
//             break;
//         case 'delete_author':
//             _authorStore.authors = action.data;
//             AuthorStore.emitChange('AuthorDelete');
//             break;
//         case 'update_author':
//             _authorStore.authors = action.data;
//             AuthorStore.emitChange('AuthorUpdate');
//             break;
//         case 'add_author':
//             _authorStore.authors = action.data;
//             AuthorStore.emitChange('AuthorAdd');
//             break;
//         default:
//             return;
//     }
// } );

export default AuthorStore;