import { EventEmitter } from 'events';

let _genreStore = {
    genres: []
};

class GenreStoreClass extends EventEmitter {

    addChangeListener(cb, GenreEvent) {
        this.on(GenreEvent, cb);
    }

    removeChangeListener(cb, GenreEvent) {
        this.removeListener(GenreEvent, cb);
    }

    emitChange(GenreEvent) {
        this.emit(GenreEvent);
    }

    getAllGenres() {
        return _genreStore.genres;
    }

}

const GenreStore = new GenreStoreClass();

// Dispatcher.register((action) => {
//
//     switch (action.actionType) {
//         case 'read_genres':
//             _genreStore.genres = action.data;
//             GenreStore.emitChange('GenreChange');
//             break;
//         case 'delete_genre':
//             _genreStore.genres = action.data;
//             GenreStore.emitChange('GenreEdit');
//             break;
//         case 'update_genre':
//             _genreStore.genres = action.data;
//             GenreStore.emitChange('GenreEdit');
//             break;
//         case 'add_genre':
//             _genreStore.genres = action.data;
//             GenreStore.emitChange('GenreEdit');
//             break;
//         default:
//             return;
//     }
// });

export default GenreStore;