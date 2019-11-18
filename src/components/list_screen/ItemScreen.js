import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import {firestoreConnect} from "react-redux-firebase";
import { Checkbox , TextInput} from "react-materialize";




class ItemScreen extends React.Component {
    state = {
        desc: this.props.item.description,
        assign: this.props.item.assigned_to,
        due: this.props.item.due_date,
        completed: this.props.item.completed
    };

    handleChange = (e) => {
        const { target } = e;
        //console.log(target.value);
        if(target.id === "completed") {
            //console.log("CHECKED")
            this.state.completed ?
                this.setState(state => ({
                    ...state,
                    [target.id]: false,
                })) :
                this.setState(state => ({
                    ...state,
                    [target.id]: true,
                 }));
        }
        else {
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
        }

    };

    submitChanges = (e) => {

    };
    render() {
        return (
            <div className="container white">
                <h2>itemscreen</h2>
                <br/><br/>
                <TextInput label="Assigned To"  value={this.state.desc} onChange={this.handleChange} name="description" id="desc"/>
                <br/><br/>
                <TextInput label="Assigned To"  value={this.state.assign} onChange={this.handleChange} name="assigned_to" id="assign"/>
                <br/><br/>
                <strong>Due Date:</strong>
                <input value={this.state.due} onChange={this.handleChange} name="due_date" id="due"/>
                <br/><br/>
                <Checkbox value="test" checked={this.state.completed} onChange={this.handleChange} label="Completed" name="completed" id="completed"/>
                <br/><br/>
                <div>
                    <button id="edit_submit_button"
                            onClick={this.submitChanges}
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