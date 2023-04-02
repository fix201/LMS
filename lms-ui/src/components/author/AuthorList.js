import React from 'react';
import PropTypes from 'prop-types';
import {AuthorForm} from './AuthorForm';

export class AuthorList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            showUpdateForm: false,
            author: null
        }
    }
    
    handleUpdate = (author) => {
        this.setState((prevState) => ({ 
            author: author, 
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
            author: null
        });
    }
    
    handleDelete = (author) => {
        this.props.deleteAuthor(author.id);
    }

    createAuthorRow(author, index) {
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {author.name} </td>
                <td> {author.gender} </td>
                <td> {author.email} </td>
                <td>
                    <button onClick={() => this.handleUpdate(author)} className="btn btn-info">Update </button>
                    <button style={{marginLeft: "10px"}} onClick={() => this.handleDelete(author)} className="btn btn-danger">Delete </button>
                    {/*<button style={{marginLeft: "10px"}} onClick={ } className="btn btn-info">View </button>*/}
                </td>
            </tr>

        );
    }

    render() {
        return (
            <div className={"m-3 container"}>
                <h1 className="text-center">Authors</h1>
                <div className = "row">
                    <button onClick={() => this.handleAdd()} className="btn btn-primary" > Add Author</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.authorList.map(this.createAuthorRow, this)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        {this.state.showUpdateForm && <AuthorForm author={this.state.author} 
                                                                  updateAuthor={this.props.updateAuthor}
                                                                  onClose={this.resetForm}/>}
                    </div>
                    <div>
                        {this.state.showAddForm && <AuthorForm updateAuthor={this.props.addAuthor}
                                                               onClose={this.resetForm}/>}
                    </div>
                </div>
            </div>
        );
    }
}

AuthorList.propTypes = {
    authorList: PropTypes.array.isRequired,
    addAuthor: PropTypes.func.isRequired,
    updateAuthor: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired
};



