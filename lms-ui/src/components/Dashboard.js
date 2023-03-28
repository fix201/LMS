import React from 'react';
import BookStore from '../stores/BookStore';
import AuthorStore from '../stores/AuthorStore';
import AppNavbar from './NavBar';
import '../styles/Dashboard.css';
import {LoanRecordList} from "./loans/LoanRecordList";
import LoanRecordStore from "../stores/LoanRecordStore";
import {AuthorList} from "./author/AuthorList";
import {BookList} from "./book/BookList";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            authorList: [],
            loanRecordList: []
        };
    }

    render() {
        const books = this.state.bookList.slice(0, 5);
        const authors = this.state.authorList.slice(0, 5);
        const loanRecordList = this.state.loanRecordList.slice(0, 5);
        return (
            <div>
                <AppNavbar />
                <div className="container mt-2 dashboard">
                    <div className="items">
                        <BookList bookList={books}/>
                    </div>
                    <div className="items">
                        <AuthorList authorList={authors}/>
                    </div>
                    <div className="items">
                        <LoanRecordList loanRecordList={loanRecordList}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        BookStore.addChangeListener(this._onBookChange.bind(this), 'BookChange');
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this), 'AuthorChange');
        LoanRecordStore.addChangeListener(this._onLoanRecordChange.bind(this), 'LoanRecordChange');

    }

    componentWillUnmount() {
        BookStore.removeChangeListener(this._onBookChange.bind(this), 'BookChange');
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this), 'AuthorChange');
        LoanRecordStore.removeChangeListener(this._onLoanRecordChange.bind(this), 'LoanRecordChange');
    }

    _onBookChange() {
        this.setState({bookList: BookStore.getAllBooks()});
    }

    _onAuthorChange() {
        this.setState({authorList: AuthorStore.getAllAuthors()});
    }

    _onLoanRecordChange() {
        this.setState({loanRecordList: LoanRecordStore.getAllLoanRecords()})
    }

}