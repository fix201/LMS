import React from 'react';
import PropTypes from 'prop-types';
import {PublisherList} from './PublisherList';
import AppNavbar from "../NavBar";

export class Publishers extends React.Component{

    render() {
        return(
            <div>
                <AppNavbar />
                <PublisherList publisherList = {this.props.publisherList} />
            </div>
        );
    }
}

Publishers.propTypes = {
    publisherList: PropTypes.array.isRequired
};
