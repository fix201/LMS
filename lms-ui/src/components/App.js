import '../styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from './Dashboard';
import Books from './book/Books';
import Authors from './author/Authors';
import Publishers from './publisher/Publishers';
import LoanRecords from "./loans/LoanRecords";
import Genres from "./genre/Genres";
import AppNavbar from "./NavBar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setIsAuthenticated = this.setIsAuthenticated.bind(this);
        this.getIsAuthenticated = this.getIsAuthenticated.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    setIsAuthenticated(isAuthenticated) {
        sessionStorage.setItem('authenticated', isAuthenticated);
    }

    getIsAuthenticated() {
        return sessionStorage.getItem('authenticated');
    }

    handleLogout() {
        sessionStorage.removeItem('authenticated');
        window.location.reload(false);
    }

    render() {
        const isAuthenticated = this.getIsAuthenticated();

        if (!isAuthenticated) {
            return <Login setIsAuthenticated={this.setIsAuthenticated} handleLogout={this.handleLogout}/>
        }

        return (
            <div>
                <BrowserRouter>
                    <AppNavbar handleLogout={this.handleLogout}/>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/books" element={<Books />}/>
                        <Route path="/authors" element={<Authors />}/>
                        <Route path="/loans" element={<LoanRecords />}/>
                        <Route path="/genres" element={<Genres />}/>
                        <Route path="/publishers" element={<Publishers />}/>
                        <Route path='*' element={<Dashboard to='/dashboard'/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
