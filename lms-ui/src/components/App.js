import '../styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from './Dashboard';
import {Books} from './book/Books.js';
import {Authors} from './author/Authors.js';
import {Publishers} from './publisher/Publishers.js';
import {LoanRecords} from "./loans/LoanRecords";
import {Genres} from "./genre/Genres";
import BookStore from '../stores/BookStore';
import AuthorStore from '../stores/AuthorStore';
import PublisherStore from '../stores/PublisherStore';
import LoanRecordStore from "../stores/LoanRecordStore";
import GenreStore from "../stores/GenreStore";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            authorList: [],
            publisherList: [],
            genreList: [],
            loanRecordList: []
        };
    }

    setIsAuthenticated(isAuthenticated) {
        sessionStorage.setItem('authenticated', isAuthenticated);
    }

    getIsAuthenticated() {
        return sessionStorage.getItem('authenticated');
    }

    render() {
        const isAuthenticated = this.getIsAuthenticated();

        if (!isAuthenticated) {
            return <Login setIsAuthenticated={this.setIsAuthenticated}/>
        }

        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/books" element={<Books bookList={this.state.bookList}/>}/>
                        <Route path="/authors" element={<Authors authorList={this.state.authorList}/>}/>
                        <Route path="/loans" element={<LoanRecords loanRecordList={this.state.loanRecordList}/>}/>
                        <Route path="/genres" element={<Genres genreList={this.state.genreList}/>}/>
                        <Route path="/publishers" element={<Publishers publisherList={this.state.publisherList}/>}/>
                        <Route path='*' element={<Dashboard to='/dashboard'/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

    componentDidMount() {
        BookStore.addChangeListener(this._onBookChange.bind(this), 'BookChange');
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this), 'AuthorChange');
        LoanRecordStore.addChangeListener(this._onLoanRecordChange.bind(this), 'LoanRecordChange');
        PublisherStore.addChangeListener(this._onPublisherChange.bind(this), 'PublisherChange');
        GenreStore.addChangeListener(this._onGenreChange.bind(this), 'GenreChange');
    }

    componentWillUnmount() {
        BookStore.removeChangeListener(this._onBookChange.bind(this), 'BookChange');
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this), 'AuthorChange');
        LoanRecordStore.removeChangeListener(this._onLoanRecordChange.bind(this), 'LoanRecordChange');
        PublisherStore.removeChangeListener(this._onPublisherChange.bind(this), 'PublisherChange');
        GenreStore.removeChangeListener(this._onGenreChange.bind(this), 'GenreChange');
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

    _onPublisherChange() {
        this.setState({publisherList: PublisherStore.getAllPublishers()})
    }

    _onGenreChange() {
        this.setState({genreList: GenreStore.getAllGenres()})
    }
}
