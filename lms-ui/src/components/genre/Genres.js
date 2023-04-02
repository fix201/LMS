import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GenreList } from './GenreList';
import AppNavbar from "../NavBar";
import {fetchGenres, updateGenre, addGenre, deleteGenre} from "../../actions/GenreActions";

class Genres extends React.Component {

    componentDidMount() {
        this.props.fetchGenres();
    }

    render() {
        return (
            <div>
                <AppNavbar />
                <GenreList genreList={this.props.genres}
                            updateGenre={this.props.updateGenre}
                            addGenre={this.props.addGenre}
                            deleteGenre={this.props.deleteGenre
                            }/>
            </div>
        );
    }
}

Genres.propTypes = {
    genres: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        genres: state.genreReducer.genres
    }
}

export default connect(mapStateToProps, { fetchGenres, updateGenre, addGenre, deleteGenre })(Genres);
