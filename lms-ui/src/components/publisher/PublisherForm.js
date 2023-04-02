import React from 'react';

export class PublisherForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            publisher: this.props.publisher,
            dateInputType: 'text'
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            publisher: {
                ...prevState.publisher,
                [name]: value,
            },
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.publisher);
    }

    render() {
        const { showDetails, showAddForm, showUpdateForm, onClose } = this.props;
        const showModal = showDetails || showUpdateForm || showAddForm;
        const { publisher, dateInputType } = this.state;
        return (
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`}
                 tabIndex="-1" role="dialog" data-toggle="modal"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title"}>
                                {
                                    showDetails ? 'Publisher Details' : 'Update Publisher'
                                }
                            </h5>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={"form-group"}>
                                    <label htmlFor={"name"}>Publisher Name</label>
                                    <input type="text" className="form-control" name={"name"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? publisher?.name : ""}
                                           placeholder={publisher?.name ?? "Enter Publisher Name"}
                                           onChange={this.handleChange} required/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"email"}>Email</label>
                                    <input type="email" className="form-control" name={"email"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? publisher?.email : ""}
                                           placeholder={publisher?.email ?? "Enter Publisher Email"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"phoneNumber"}>Phone</label>
                                    <input type="text" className="form-control" name={"phoneNumber"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? publisher?.phoneNumber : ""}
                                           placeholder={publisher?.phoneNumber ?? "Enter Publisher Phone Number"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"establishmentDate"}>Date of Establishment</label>
                                    <input type={dateInputType} className="form-control" name={"establishmentDate"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? publisher?.establishmentDate : ""}
                                           placeholder={publisher?.establishmentDate ?? "Enter Publisher Birth Date"}
                                           onChange={this.handleChange}
                                           onBlur={()=> {this.setState({dateInputType: 'text'})}}
                                           onFocus={()=> {this.setState({dateInputType: 'date'})}}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"address"}>Address</label>
                                    <input type="text" className="form-control" name={"address"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? publisher?.address : ""}
                                           placeholder={publisher?.address ?? "Enter Publisher Address"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"type"}>Type</label>
                                    <input type="text" className="form-control" name={"type"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? publisher?.type : ""}
                                           placeholder={publisher?.type ?? "Enter Publisher Type"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
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
