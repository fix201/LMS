import React from 'react';
import PropTypes from 'prop-types';

export class LoanRecordList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            loanRecord: null
        }
    }

    handleUpdate = (loanRecord) => {
        this.props.updateLoanRecord(loanRecord);
    };

    createLoanRecordRow(loanRecord, index) {
        return (
            <tr key={index}>
                <td> {loanRecord.userName} </td>
                <td> {loanRecord.branchName} </td>
                <td> {loanRecord.bookTitle} </td>
                <td> {loanRecord.loanDate} </td>
                <td> {loanRecord.dueDate} </td>
                {
                    loanRecord?.dateIn ? (
                        <td> {loanRecord.dateIn} </td>
                    ) : (
                        <td><button onClick={() => this.handleUpdate(loanRecord)} className="btn btn-info">Check In</button></td>
                    )
                }
            </tr>
        );
    }

    render() {
        return (
            <div className={"m-3 container"}>
                <h1 className="text-center">Loan Records</h1>
                <div className="row">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
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
            </div>
        );
    }

}

LoanRecordList.propTypes = {
    loanRecordList: PropTypes.array.isRequired,
    updateLoanRecord: PropTypes.func.isRequired
};