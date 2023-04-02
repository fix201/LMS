import React from 'react';
import {LoanRecordList} from './LoanRecordList';
import { connect } from 'react-redux';
import AppNavbar from "../NavBar";
import {fetchLoanRecords, updateLoanRecord} from "../../actions/LoanRecordActions";

class LoanRecords extends React.Component {

    componentDidMount() {
        this.props.fetchLoanRecords();
    }

    render() {
        return (
            <div>
                <AppNavbar />
                <LoanRecordList loanRecordList={this.props.loanRecordList}
                                updateLoanRecord={this.props.updateLoanRecord}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loanRecordList: state.loanRecordReducer.loanRecords
    }
}

export default connect(mapStateToProps, { fetchLoanRecords, updateLoanRecord })(LoanRecords);

