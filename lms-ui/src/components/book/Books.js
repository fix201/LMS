import React from 'react';
import PropTypes from 'prop-types';
import {BookList} from './BookList';
import AppNavbar from "../NavBar";

export class Books extends React.Component{

    render() {
        return(
            <div>
                <AppNavbar />
                <BookList bookList = {this.props.bookList} />
            </div>
        );
    }
}

Books.propTypes = {
    bookList: PropTypes.array.isRequired
};
