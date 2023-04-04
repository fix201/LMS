import React from 'react';
import PropTypes from 'prop-types';
import {LoanRecordList} from './LoanRecordList';
import {connect} from 'react-redux';
import {fetchLoanRecords, updateLoanRecord} from "../../actions/LoanRecordActions";

class LoanRecords extends React.Component {

    componentDidMount() {
        this.props.fetchLoanRecords();
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <LoanRecordList loanRecordList={this.props.loanRecordList}
                                updateLoanRecord={this.props.updateLoanRecord}/>
            </div>
        );
    }
}

LoanRecords.propTypes = {
    loanRecordList: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        loanRecordList: state.loanRecordReducer.loanRecords
    }
}

export default connect(mapStateToProps, {fetchLoanRecords, updateLoanRecord})(LoanRecords);

