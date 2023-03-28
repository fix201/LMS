import Dispatcher from '../dispatcher/appDispatcher';
import { EventEmitter } from 'events';

let _bookStore = {
    books: []
};

class BookStoreClass extends EventEmitter {

    addChangeListener(cb, BookEvent) {
        this.on(BookEvent, cb);
    }

    removeChangeListener(cb, BookEvent) {
        this.removeListener(BookEvent, cb);
    }

    emitChange(BookEvent) {
        this.emit(BookEvent);
    }

    getAllBooks() {
        return _bookStore.books;
    }

}

const BookStore = new BookStoreClass();

Dispatcher.register((action) => {

    switch (action.actionType) {
        case 'read_books':
            _bookStore.books = action.data;
            BookStore.emitChange('BookChange');
            break;
        case 'delete_book':
            _bookStore.books = action.data;
            BookStore.emitChange('BookEdit');
            break;
        case 'update_book':
            _bookStore.books = action.data;
            BookStore.emitChange('BookEdit');
            break;
        case 'add_book':
            _bookStore.books = action.data;
            BookStore.emitChange('BookEdit');
            break;
        default:
            return;
    }
});

export default BookStore;