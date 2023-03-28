import React from 'react';
import PublisherActions from '../../actions/PublisherActions';

export class AddPublisherForm extends React.Component {
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
            publisherName: this.state.publisher_name
        }
        PublisherActions.addPublisher(publisher)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Add Publisher</legend>
                <label>
                    Publisher Name:
                        <input type="text" value={this.state.publisher_name} onChange={this.handleChange} />
                </label> <br />
                <input type="submit" value="Add" />
            </form>
        );
    }
}
