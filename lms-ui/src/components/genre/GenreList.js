import React from 'react';
import PropTypes from 'prop-types';
import GenreActions from "../../actions/GenreActions";

export class GenreList extends React.Component {

    componentDidMount(){
        GenreActions.readGenres();
    }

    constructor() {
        super()
        this.state = {
            isUpdate: false,
            isAdd: false,
            genre: null
        }
        this.isUpdating = this.isUpdating.bind(this)
        this.isAdding = this.isAdding.bind(this)
    }

    isUpdating(genre) {
        this.setState(genre);
        this.setState((prevState) => {
            return {
                isUpdate: !prevState.isUpdate
            }
        })

    }

    isAdding(genre) {
        this.genre = genre;
        this.setState((prevState) => {
            return {
                isAdd: !prevState.isAdd
            }
        })

    }

    createGenreRow(genre, index) {
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {genre.genreName} </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h1>Genres</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Genre Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.genreList.map(this.createGenreRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

}

GenreList.propTypes = {
    genreList: PropTypes.array.isRequired
};