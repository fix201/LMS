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
                                           value={showDetails ? publisher?.name : ""}
                                           placeholder={publisher?.name ?? "Enter Publisher Name"}
                                           onChange={this.handleChange} required/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"email"}>Email</label>
                                    <input type="email" className="form-control" name={"email"}
                                           readOnly={showDetails}
                                           value={showDetails ? publisher?.email : ""}
                                           placeholder={publisher?.email ?? "Enter Publisher Email"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"gender"}>Gender</label>
                                    <input type="text" className="form-control" name={"gender"}
                                           readOnly={showDetails}
                                           value={showDetails ? publisher?.gender : ""}
                                           placeholder={publisher?.gender ?? "Enter Publisher Gender"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"dob"}>Birth Date</label>
                                    <input type={dateInputType} className="form-control" name={"dob"}
                                           readOnly={showDetails}
                                           value={showDetails ? publisher?.dob : ""}
                                           placeholder={publisher?.dob ?? "Enter Publisher Birth Date"}
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
