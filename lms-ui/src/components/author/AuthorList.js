import React from 'react';
import PropTypes from 'prop-types';
import {AuthorForm} from './AuthorForm';

export class AuthorList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            author: null
        }
    }
    
    handleView = (author) => {
        this.setState({ author: author, showDetailsForm: true });
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
            showDetailsForm: false,
            author: null
        });
    }
    
    handleDelete = (author) => {
        this.props.deleteAuthor(author.id);
    }
    
    handleSubmit = (author) => {
        author?.id ? this.props.updateAuthor(author) : this.props.addAuthor(author);
        this.resetForm();
    }

    createAuthorRow(author, index) {
        return (
            <tr key={index}>
                <td onClick={() => this.handleView(author)}> {index + 1} </td>
                <td onClick={() => this.handleView(author)}> {author.name} </td>
                <td onClick={() => this.handleView(author)}> {author.gender} </td>
                <td onClick={() => this.handleView(author)}> {author.email} </td>
                <td>
                    <button onClick={() => this.handleUpdate(author)} className="btn btn-info">Update </button>
                    <button style={{marginLeft: "10px"}} onClick={() => this.handleDelete(author)} className="btn btn-danger">Delete </button>
                </td>
            </tr>

        );
    }

    createAuthorDashboardRow(author, index) {
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {author.name} </td>
                <td> {author.gender} </td>
                <td> {author.email} </td>
            </tr>

        );
    }

    render() {
        return (
            <div className={"m-3 container"}>
                <h1 className="text-center">Authors</h1>
                {
                    !this.props?.dashboard &&
                    <div className = "row">
                        <button onClick={() => this.handleAdd()} className="btn btn-primary" > Add Author</button>
                    </div>
                }
                <br></br>
                <div className="row">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                { !this.props?.dashboard && (<th>Actions</th>) }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props?.dashboard ? 
                                this.props.authorList.map(this.createAuthorDashboardRow, this) :
                                this.props.authorList.map(this.createAuthorRow, this)
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        {this.state.showUpdateForm && <AuthorForm author={this.state.author}
                                                                  showUpdateForm={this.state.showUpdateForm}
                                                                  onSubmit={this.handleSubmit}
                                                                  onClose={this.resetForm}
                                                      />
                        }
                    </div>
                    <div>
                        {this.state.showAddForm && <AuthorForm onSubmit={this.handleSubmit}
                                                               showAddForm={this.state.showAddForm}
                                                               onClose={this.resetForm}
                                                    />
                        }
                    </div>
                    <div>
                        {this.state.showDetailsForm && <AuthorForm author={this.state.author} 
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

AuthorList.propTypes = {
    authorList: PropTypes.array.isRequired,
};



