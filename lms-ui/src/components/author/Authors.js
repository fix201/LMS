import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthorList } from './AuthorList';
import {fetchAuthors, updateAuthor, addAuthor, deleteAuthor} from "../../actions/AuthorActions";

class Authors extends React.Component {
    
    componentDidMount() {
        this.props.fetchAuthors();
    }

    render() {
        return (
            <div>
                <AuthorList authorList={this.props.authors} 
                            updateAuthor={this.props.updateAuthor}  
                            addAuthor={this.props.addAuthor}
                            deleteAuthor={this.props.deleteAuthor
                }/>
            </div>
        );
    }
}

Authors.propTypes = {
    authors: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        authors: state.authorReducer.authors
    }
}

export default connect(mapStateToProps, { fetchAuthors, updateAuthor, addAuthor, deleteAuthor })(Authors);
