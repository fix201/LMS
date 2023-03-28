import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../../actions/AuthorActions';
import {AddAuthorForm} from './AddAuthorForm';
import {UpdateAuthorForm} from './UpdateAuthorForm';

export class AuthorList extends React.Component {

    componentDidMount() {
        AuthorActions.readAuthors();
    }

    constructor() {
        super()
        this.state = {
            isUpdate: false,
            isAdd: false,
            author: null
        }
        this.isUpdating = this.isUpdating.bind(this)
        this.isAdding = this.isAdding.bind(this)
    }

    isUpdating(author) {
        this.setState(author);
        this.setState((prevState) => {
            return {
                isUpdate: !prevState.isUpdate
            }
        })
        
    }

    isAdding(author) {
        this.author = author;
        this.setState((prevState) => {
            return {
                isAdd: !prevState.isAdd
            }
        })
        
    }

    createAuthorRow(author, index) {

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
            <div>
                <h1>Authors</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.authorList.map(this.createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

AuthorList.propTypes = {
    authorList: PropTypes.array.isRequired
};



