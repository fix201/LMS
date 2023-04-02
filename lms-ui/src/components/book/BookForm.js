import React from 'react';

export class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            book: this.props.book,
            dateInputType: 'text'
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            book: {
                ...prevState.book,
                [name]: value,
            },
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.book);
    }

    render() {
        const { showDetails, showAddForm, showUpdateForm, onClose } = this.props;
        const showModal = showDetails || showUpdateForm || showAddForm;
        const { book, dateInputType } = this.state;
        return (
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`}
                 tabIndex="-1" role="dialog" data-toggle="modal"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title"}>
                                {
                                    showDetails ? 'Book Details' : 'Update Book'
                                }
                            </h5>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={"form-group"}>
                                    <label htmlFor={"name"}>Book Name</label>
                                    <input type="text" className="form-control" name={"name"}
                                           readOnly={showDetails}
                                           value={showDetails ? book?.name : ""}
                                           placeholder={book?.name ?? "Enter Book Name"}
                                           onChange={this.handleChange} required/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"email"}>Email</label>
                                    <input type="email" className="form-control" name={"email"}
                                           readOnly={showDetails}
                                           value={showDetails ? book?.email : ""}
                                           placeholder={book?.email ?? "Enter Book Email"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"gender"}>Gender</label>
                                    <input type="text" className="form-control" name={"gender"}
                                           readOnly={showDetails}
                                           value={showDetails ? book?.gender : ""}
                                           placeholder={book?.gender ?? "Enter Book Gender"}
                                           onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"dob"}>Birth Date</label>
                                    <input type={dateInputType} className="form-control" name={"dob"}
                                           readOnly={showDetails}
                                           value={showDetails ? book?.dob : ""}
                                           placeholder={book?.dob ?? "Enter Book Birth Date"}
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
