import React from 'react';
import PropTypes from 'prop-types';
import PublisherActions from '../../actions/PublisherActions';
import {AddPublisherForm} from './AddPublisherForm';
import {UpdatePublisherForm} from './UpdatePublisherForm';

export class PublisherList extends React.Component {

    constructor() {
        super()
        this.state = {
            isUpdate: false,
            isAdd: false,
            publisher: null
        }
        this.isUpdating = this.isUpdating.bind(this)
        this.isAdding = this.isAdding.bind(this)
    }

    componentDidMount(){
        PublisherActions.readPublishers();
    }

    isUpdating(publisher) {
        this.setState(publisher);
        this.setState((prevState) => {
            return {
                isUpdate: !prevState.isUpdate
            }
        })

    }

    isAdding(publisher) {
        this.publisher = publisher;
        this.setState((prevState) => {
            return {
                isAdd: !prevState.isAdd
            }
        })

    }

    createPublisherRow(publisher, index) {
        console.log(publisher)
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {publisher.name} </td>
                <td> {publisher.address} </td>
                <td> {publisher.phoneNumber} </td>
                <td> {publisher.email} </td>
                <td> {publisher.type} </td>
                <td> {publisher.establishmentDate} </td>
                <td className="btn-toolbar">
                    <button id="update"
                            className="update btn btn-warning btn-sm"
                            onClick={() => {
                                this.isUpdating(publisher)
                            }}>update
                    </button>
                    <button className="btn btn-danger btn-rounded btn-sm buttonDelete"
                            onClick={() => PublisherActions.deletePublisher(publisher.publisher_id)}>delete
                    </button>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h1>Publishers</h1>
                <table className="table table-hover ">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Date of Establishment</th>
                        <th>Update / Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.publisherList.map(this.createPublisherRow, this)}
                    <tr>
                        <td>
                            <button onClick={() => this.isAdding(this.publisher)}>Add</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    {
                        this.state.isUpdate && <UpdatePublisherForm publisher={this.state.publisher}/>
                    }
                </div>
                {
                    this.state.isAdd && <AddPublisherForm/>
                }
            </div>
        );
    }
}

PublisherList.propTypes = {
    publisherList: PropTypes.array.isRequired
};



