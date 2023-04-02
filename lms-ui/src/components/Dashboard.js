import React from 'react';
import AppNavbar from './NavBar';
import '../styles/Dashboard.css';
import {LoanRecordList} from "./loans/LoanRecordList";
import {AuthorList} from "./author/AuthorList";
import {BookList} from "./book/BookList";
import { connect } from 'react-redux';
import {fetchAuthors} from "../actions/AuthorActions";
import {fetchBooks} from "../actions/BookActions";
import {fetchLoanRecords, updateLoanRecord} from "../actions/LoanRecordActions";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            authorList: [],
            loanRecordList: []
        };
    }

    render() {
        const books = this.props.books?.slice(0, 5);
        const authors = this.props.authors?.slice(0, 5);
        const loanRecordList = this.props.loanRecordList?.slice(0, 5);
        return (
            <div>
                <AppNavbar />
                <div className="container mt-2 dashboard">
                    <div className="items">
                        <BookList bookList={books} dashboard={true} />
                    </div>
                    <div className="items">
                        <AuthorList authorList={authors} dashboard={true} />
                    </div>
                    <div className="items">
                        <LoanRecordList loanRecordList={loanRecordList} dashboard={true} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchBooks();
        this.props.fetchLoanRecords();
        this.props.fetchAuthors();
    }

    componentWillUnmount() {
    }
}

const mapStateToProps = state => {
    return {
        authors: state.authorReducer.authors,
        books: state.bookReducer.books,
        loanRecordList: state.loanRecordReducer.loanRecords
    }
}

export default connect(mapStateToProps, { fetchAuthors, fetchBooks, fetchLoanRecords })(Dashboard);