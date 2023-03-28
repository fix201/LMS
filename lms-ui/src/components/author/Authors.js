import React from 'react';
import PropTypes from 'prop-types';
import { AuthorList } from './AuthorList';
import AppNavbar from "../NavBar";

export class Authors extends React.Component {

    render() {
        return (
            <div>
                <AppNavbar />
                <AuthorList authorList={this.props.authorList} />
            </div>
        );
    }
}

Authors.propTypes = {
    authorList: PropTypes.array.isRequired
};
