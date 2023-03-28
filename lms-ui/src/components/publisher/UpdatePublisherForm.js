import React from 'react';
import PublisherActions from '../../actions/PublisherActions';

export class UpdatePublisherForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { publisher_name: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ publisher_name: event.target.value });
    }

    handleSubmit(event) {
        
        var publisher = {
            publisherId: this.props.publisher.publisher_id,
            publisherName: this.state.publisher_name
        }
        PublisherActions.updatePublisher(publisher)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Update Publisher</legend>
                <label>
                    Publisher Name:
                        <input type="text" value={this.state.publisher_name} onChange={this.handleChange} placeholder={this.props.publisher.publisher_name} />
                </label> <br />
                <input type="submit" value="Update" />
            </form>
        );
    }
}
