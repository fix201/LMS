import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PublisherList } from './PublisherList';
import {fetchPublishers, updatePublisher, addPublisher, deletePublisher} from "../../actions/PublisherActions";

class Publishers extends React.Component {

    componentDidMount() {
        this.props.fetchPublishers();
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <PublisherList publisherList={this.props.publishers}
                            updatePublisher={this.props.updatePublisher}
                            addPublisher={this.props.addPublisher}
                            deletePublisher={this.props.deletePublisher
                            }/>
            </div>
        );
    }
}

Publishers.propTypes = {
    publishers: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        publishers: state.publisherReducer.publishers
    }
}

export default connect(mapStateToProps, { fetchPublishers, updatePublisher, addPublisher, deletePublisher })(Publishers);
