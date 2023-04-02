import PublisherApi from '../api/PublisherApi';

const PublishersActions = {
    readPublishers: function () {
        PublisherApi.getAllPublishers((publisherList) => {
            // Dispatcher.dispatch({
            //     actionType: 'read_publishers',
            //     data: publisherList
            // })
        })
    },

    deletePublisher: (publisherId) => {
        PublisherApi.deletePublisher(publisherId, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'delete_publisher',
            //     status: res
            // })
        })
    },

    updatePublisher: (publisher) => {
        PublisherApi.updatePublisher(publisher, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'update_publisher',
            //     status: res
            // })
        })
    }

}

export default PublishersActions;