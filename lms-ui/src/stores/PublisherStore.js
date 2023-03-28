import Dispatcher from '../dispatcher/appDispatcher';
import { EventEmitter } from 'events';

let _publisherStore = {
    publishers: []
};

class PublisherStoreClass extends EventEmitter {

    addChangeListener(cb, PublisherEvent) {
        this.on(PublisherEvent, cb);
    }

    removeChangeListener(cb, PublisherEvent) {
        this.removeListener(PublisherEvent, cb);
    }

    emitChange(PublisherEvent) {
        this.emit(PublisherEvent);
    }

    getAllPublishers() {
        return _publisherStore.publishers;
    }

}

const PublisherStore = new PublisherStoreClass();

Dispatcher.register((action) => {

    switch (action.actionType) {
        case 'read_publishers':
            _publisherStore.publishers = action.data;
            PublisherStore.emitChange('PublisherChange');
            break;
        case 'delete_publisher':
            _publisherStore.publishers = action.data;
            PublisherStore.emitChange('PublisherEdit');
            break;
        case 'update_publisher':
            _publisherStore.publishers = action.data;
            PublisherStore.emitChange('PublisherEdit');
            break;
        case 'add_publisher':
            _publisherStore.publishers = action.data;
            PublisherStore.emitChange('PublisherEdit');
            break;
        default:
            return;
    }
});

export default PublisherStore;