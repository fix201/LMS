import React from 'react';

export class GenreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            genre: this.props.genre
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            genre: {
                ...prevState.genre,
                [name]: value,
            },
        }));
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.genre);
    }

    render() {
        const { showDetails, showAddForm, showUpdateForm, onClose } = this.props;
        const showModal = showDetails || showUpdateForm || showAddForm;
        const { genre } = this.state;
        return (
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`}
                 tabIndex="-1" role="dialog" data-toggle="modal"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title"}>
                                {
                                    showDetails ? 'Genre Details' : 'Update Genre'
                                }
                            </h5>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={"form-group"}>
                                    <label htmlFor={"genreName"}>Genre Name</label>
                                    <input type="text" className="form-control" name={"genreName"}
                                           readOnly={showDetails}
                                           defaultValue={showDetails ? genre?.genreName : ""}
                                           placeholder={genre?.genreName ?? "Enter Genre Name"}
                                           onChange={this.handleChange} required/>
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
