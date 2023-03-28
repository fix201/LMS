import React from 'react';
import PropTypes from 'prop-types';
import LoanRecordActions from "../../actions/LoanRecordActions";

export class LoanRecordList extends React.Component {
    constructor() {
        super()
        this.state = {
            isUpdate: false,
            isAdd: false,
            loanRecord: null
        }
        this.isUpdating = this.isUpdating.bind(this)
        this.isAdding = this.isAdding.bind(this)
    }

    componentDidMount() {
        LoanRecordActions.readLoanRecords();
    }

    isUpdating(loanRecord) {
        this.setState(loanRecord);
        this.setState((prevState) => {
            return {
                isUpdate: !prevState.isUpdate
            }
        })

    }

    isAdding(loanRecord) {
        this.loanRecord = loanRecord;
        this.setState((prevState) => {
            return {
                isAdd: !prevState.isAdd
            }
        })

    }

    createLoanRecordRow(loanRecord, index) {
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {loanRecord.userName} </td>
                <td> {loanRecord.branchName} </td>
                <td> {loanRecord.bookTitle} </td>
                <td> {loanRecord.loanDate} </td>
                <td> {loanRecord.dueDate} </td>
                <td> {loanRecord.dateIn} </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h1>Loan Records</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Library</th>
                        <th>Book</th>
                        <th>Loan Date</th>
                        <th>Due Date</th>
                        <th>Date In</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.loanRecordList.map(this.createLoanRecordRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

}

LoanRecordList.propTypes = {
    loanRecordList: PropTypes.array.isRequired
};