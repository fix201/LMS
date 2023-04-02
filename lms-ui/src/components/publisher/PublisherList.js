import React from 'react';
import PropTypes from 'prop-types';
import {PublisherForm} from './PublisherForm';

export class PublisherList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            publisher: null
        }
    }

    handleView = (publisher) => {
        this.setState({ publisher: publisher, showDetailsForm: true });
    }

    handleUpdate = (publisher) => {
        this.setState((prevState) => ({
            publisher: publisher,
            showUpdateForm: !prevState.showUpdateForm
        }));
    };

    handleAdd = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }

    resetForm = () => {
        this.setState({
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            publisher: null
        });
    }

    handleDelete = (publisher) => {
        this.props.deletePublisher(publisher.id);
    }

    handleSubmit = (publisher) => {
        console.log(publisher)
        publisher?.id ? this.props.updatePublisher(publisher) : this.props.addPublisher(publisher);
        this.resetForm();
    }

    createPublisherRow(publisher, index) {
        return (
            <tr key={index}>
                <td onClick={() => this.handleView(publisher)}> {index + 1} </td>
                <td onClick={() => this.handleView(publisher)}> {publisher.name} </td>
                <td onClick={() => this.handleView(publisher)}> {publisher.type} </td>
                <td onClick={() => this.handleView(publisher)}> {publisher.phoneNumber} </td>
                <td onClick={() => this.handleView(publisher)}> {publisher.email} </td>
                <td>
                    <button onClick={() => this.handleUpdate(publisher)} className="btn btn-info">Update </button>
                    <button style={{marginLeft: "10px"}} onClick={() => this.handleDelete(publisher)} className="btn btn-danger">Delete </button>
                </td>
            </tr>

        );
    }

    render() {
        return (
            <div className={"m-3 container"}>
                <h1 className="text-center">Publishers</h1>
                <div className = "row">
                    <button onClick={() => this.handleAdd()} className="btn btn-primary" > Add Publisher</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.publisherList.map(this.createPublisherRow, this)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        {this.state.showUpdateForm && <PublisherForm publisher={this.state.publisher}
                                                                  showUpdateForm={this.state.showUpdateForm}
                                                                  onSubmit={this.handleSubmit}
                                                                  onClose={this.resetForm}
                        />
                        }
                    </div>
                    <div>
                        {this.state.showAddForm && <PublisherForm onSubmit={this.handleSubmit}
                                                               showAddForm={this.state.showAddForm}
                                                               onClose={this.resetForm}
                        />
                        }
                    </div>
                    <div>
                        {this.state.showDetailsForm && <PublisherForm publisher={this.state.publisher}
                                                                   onClose={() => this.setState({ showDetailsForm: false })}
                                                                   showDetails={this.state.showDetailsForm}
                        />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PublisherList.propTypes = {
    publisherList: PropTypes.array.isRequired,
    addPublisher: PropTypes.func.isRequired,
    updatePublisher: PropTypes.func.isRequired,
    deletePublisher: PropTypes.func.isRequired
};



