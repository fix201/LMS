import '../styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from './Dashboard';
import Books from './book/Books';
import Authors from './author/Authors';
import Publishers from './publisher/Publishers';
import {LoanRecords} from "./loans/LoanRecords";
import Genres from "./genre/Genres";

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
            <div>
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
}
