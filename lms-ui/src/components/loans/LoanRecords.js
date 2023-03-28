import React from 'react';
import PropTypes from 'prop-types';
import {LoanRecordList} from './LoanRecordList';
import AppNavbar from "../NavBar";

export class LoanRecords extends React.Component {

    render() {
        return (
            <div>
                <AppNavbar />
                <LoanRecordList loanRecordList={this.props.loanRecordList}/>
            </div>
        );
    }
}

LoanRecords.propTypes = {
    loanRecordList: PropTypes.array.isRequired
};
