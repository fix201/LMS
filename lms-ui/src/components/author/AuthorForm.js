import React from 'react';
import {updateAuthor} from "../../actions/AuthorActions";

export class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            author: this.props.author,
            dateInputType: 'text'
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }), () => {
            if (!this.state.showModal) {
                this.props.onClose();
            }
        });
    }


    updateAuthorState(property, value) {
        this.setState((prevState) => ({
            author: {
               ...prevState.author,
                [property]: value
            }
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const author = {
            id: this.state.author?.id,
            name: this.state.author?.name,
            gender: this.state.author?.gender,
            email: this.state.author?.email,
            dob: this.state.author?.dob
        };
        this.toggleModal();
        this.props.updateAuthor(author);
    }

    render() {
        const {showModal} = this.state;
        return (
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`}
                 tabIndex="-1" role="dialog" data-toggle="modal"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title"}>Update Author</h5>
                            <button type="button" className="btn btn-outline-secondary" onClick={this.toggleModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={"form-group"}>
                                    <label htmlFor={"name"}>Author Name</label>
                                    <input type="text" className="form-control"
                                           placeholder={this.state.author?.name ?? "Enter Author Name"}
                                           onChange={(e)=> {this.updateAuthorState("name", e.target.value)}} required/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"email"}>Email</label>
                                    <input type="email" className="form-control"
                                           placeholder={this.state.author?.email ?? "Enter Author Email"}
                                           onChange={(e)=> {this.updateAuthorState("email", e.target.value)}}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"gender"}>Gender</label>
                                    <input type="text" className="form-control"
                                           placeholder={this.state.author?.gender ?? "Enter Author Gender"}
                                           onChange={(e)=> {this.updateAuthorState("gender", e.target.value)}}/>
                                </div>
                                <br/>
                                <div className={"form-group"}>
                                    <label htmlFor={"dob"}>Birth Date</label>
                                    <input type={this.state.dateInputType} className="form-control"
                                           placeholder={this.state.author?.dob ?? "Enter Author Birth Date"}
                                           onChange={(e)=> {this.updateAuthorState("dob", e.target.value)}}
                                           onBlur={()=> {this.setState({dateInputType: 'text'})}}
                                           onFocus={()=> {this.setState({dateInputType: 'date'})}}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.toggleModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
