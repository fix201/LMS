import React from 'react';

export class LoanRecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            loanRecord: this.props.loanRecord,
            dateInputType: 'text'
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            loanRecord: {
                ...prevState.loanRecord,
                [name]: value,
            },
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.loanRecord);
    }

    render() {
        const { showDetails, showAddForm, showUpdateForm, onClose } = this.props;
        const showModal = showDetails || showUpdateForm || showAddForm;
        const { loanRecord, dateInputType } = this.state;
        return (
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`}
                 tabIndex="-1" role="dialog" data-toggle="modal"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title"}>
                                {
                                    showDetails ? 'LoanRecord Details' : 'Update LoanRecord'
                                }
                            </h5>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={"form-group"}>
                                    <label htmlFor={"name"}>LoanRecord Name</label>
                                    <input type="text" className="form-control" name={"name"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? loanRecord?.name : ""}
                                           placeholder={loanRecord?.name ?? "Enter LoanRecord Name"}
                                           onChange={this.handleChange} required/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"email"}>Email</label>
                                    <input type="email" className="form-control" name={"email"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? loanRecord?.email : ""}
                                           placeholder={loanRecord?.email ?? "Enter LoanRecord Email"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"gender"}>Gender</label>
                                    <input type="text" className="form-control" name={"gender"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? loanRecord?.gender : ""}
                                           placeholder={loanRecord?.gender ?? "Enter LoanRecord Gender"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"dob"}>Birth Date</label>
                                    <input type={dateInputType} className="form-control" name={"dob"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? loanRecord?.dob : ""}
                                           placeholder={loanRecord?.dob ?? "Enter LoanRecord Birth Date"}
                                           onChange={this.handleChange}
                                           onBlur={()=> {this.setState({dateInputType: 'text'})}}
                                           onFocus={()=> {this.setState({dateInputType: 'date'})}}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            {
                                showDetails ?
                                    (<div />) :
                                    (<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
                                        Save changes
                                    </button>)
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
