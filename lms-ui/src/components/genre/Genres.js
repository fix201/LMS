import React from 'react';
import PropTypes from 'prop-types';
import {GenreList} from './GenreList';
import AppNavbar from "../NavBar";

export class Genres extends React.Component{

    render() {
        return(
            <div>
                <AppNavbar />
                <GenreList genreList = {this.props.genreList} />
            </div>
        );
    }
}

Genres.propTypes = {
    genreList: PropTypes.array.isRequired
};
