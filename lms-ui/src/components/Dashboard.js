import React from 'react';
import AppNavbar from './NavBar';
import '../styles/Dashboard.css';
import {LoanRecordList} from "./loans/LoanRecordList";
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

    }

    componentWillUnmount() {
    }


}