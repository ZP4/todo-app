import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import {firestoreConnect} from "react-redux-firebase";


class ItemScreen extends React.Component {
    render() {
        const item = this.props.item;
        return (
            <div className="container white">
                <h2>itemscreen</h2>
                <strong >Item</strong>
                <br/><br/>
                <strong>Description:</strong>
                <input id="edit_description_textfield" ref="desc" type="text" value={item.description}/>
                <br/><br/>
                <strong>Assigned To:</strong>
                <input id="edit_assigned_to_textfield" ref="assign" type="text" value={item.assigned_to}/>
                <br/><br/>
                <strong>Due Date:</strong>
                <input id="edit_due_date_datefield" ref="date" type="date" value={item.due_date} />
                <br/><br/>
                <strong>Completed:</strong>
                <input id="edit_completed_checkbox" ref="check"  type="checkbox" />
                <br/><br/>
                <div>
                    <button id="edit_submit_button"
                    >Submit</button>
                    <button id="edit_cancel_button"
                            onClick={this.props.history.goBack}
                    >Cancel</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const data = ownProps.location.state;
    return {
        item: data.item
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen)