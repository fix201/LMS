import React from 'react';
import PropTypes from 'prop-types';
import {GenreForm} from './GenreForm';

export class GenreList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            genre: null
        }
    }

    handleView = (genre) => {
        this.setState({ genre: genre, showDetailsForm: true });
    }

    handleUpdate = (genre) => {
        this.setState((prevState) => ({
            genre: genre,
            showUpdateForm: !prevState.showUpdateForm
        }));
    };

    handleAdd = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }

    resetForm = () => {
        this.setState({
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            genre: null
        });
    }

    handleDelete = (genre) => {
        this.props.deleteGenre(genre.genreId);
    }

    handleSubmit = (genre) => {
        genre?.genreId ? this.props.updateGenre(genre) : this.props.addGenre(genre);
        this.resetForm();
    }

    createGenreRow(genre, index) {
        return (
            <tr key={index}>
                <td onClick={() => this.handleView(genre)}> {index + 1} </td>
                <td onClick={() => this.handleView(genre)}> {genre.genreName} </td>
                <td>
                    <button onClick={() => this.handleUpdate(genre)} className="btn btn-info">Update </button>
                    <button style={{marginLeft: "10px"}} onClick={() => this.handleDelete(genre)} 
                            className="btn btn-danger">Delete </button>
                </td>
            </tr>

        );
    }

    render() {
        return (
            <div className={"m-3 container"}>
                <h1 className="text-center">Genres</h1>
                <div className = "row">
                    <button onClick={() => this.handleAdd()} className="btn btn-primary" > Add Genre</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.genreList.map(this.createGenreRow, this)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        {this.state.showUpdateForm && <GenreForm genre={this.state.genre}
                                                                  showUpdateForm={this.state.showUpdateForm}
                                                                  onSubmit={this.handleSubmit}
                                                                  onClose={this.resetForm}
                        />
                        }
                    </div>
                    <div>
                        {this.state.showAddForm && <GenreForm onSubmit={this.handleSubmit}
                                                               showAddForm={this.state.showAddForm}
                                                               onClose={this.resetForm}
                        />
                        }
                    </div>
                    <div>
                        {this.state.showDetailsForm && <GenreForm genre={this.state.genre}
                                                                   onClose={() => this.setState({ showDetailsForm: false })}
                                                                   showDetails={this.state.showDetailsForm}
                        />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

GenreList.propTypes = {
    genreList: PropTypes.array.isRequired,
    addGenre: PropTypes.func.isRequired,
    updateGenre: PropTypes.func.isRequired,
    deleteGenre: PropTypes.func.isRequired
};



