import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {Checkbox, TextInput, Button, Icon} from "react-materialize";




class ItemScreen extends React.Component {
    state = {
        desc: this.props.item.description,
        assign: this.props.item.assigned_to,
        due: this.props.item.due_date,
        completed: this.props.item.completed,
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
        const firestore = this.props.firestore;
        let itemArray;
        firestore.collection('todoLists').doc(this.props.match.params.id).get()
            .then((e) => {
                itemArray = e.get('items');
                for(let x = 0; x < itemArray.length; x++) {
                    if (itemArray[x].key === this.props.item.key) {
                        itemArray[x].description = this.state.desc;
                        itemArray[x].assigned_to = this.state.assign;
                        itemArray[x].due_date = this.state.due;
                        itemArray[x].completed = this.state.completed;
                    }
                }
                // console.log(itemArray);
                // console.log(typeof itemArray[1]);
            }).finally((e) => {
                firestore.collection('todoLists').doc(this.props.match.params.id).update({
                    items: itemArray
                });
                this.props.history.goBack();
            });
    };

    submitNewItem = (e) => {
        const firestore = this.props.firestore;
        let itemArray;
        firestore.collection('todoLists').doc(this.props.match.params.id).get()
            .then((e) => {
                itemArray = e.get('items');
                itemArray.push({
                    key: itemArray.length,
                    description: this.state.desc,
                    assigned_to: this.state.assign,
                    due_date: this.state.due,
                    completed: this.state.completed
                })
            }).finally((e) => {
            firestore.collection('todoLists').doc(this.props.match.params.id).update({
                items: itemArray
            });
            this.props.history.goBack();
        });
    };
    render() {
        return (
            <div className="container white rounded_corner " style={this.style}>

                <div className="container ">
                    <h3>{this.props.match.params.itemId === "new" ? "New Item" : "Edit Item"}</h3>
                    <br/>
                    <TextInput label="Description"  value={this.state.desc} onChange={this.handleChange} name="description" id="desc"/>
                    <br/><br/>
                    <TextInput label="Assigned To"  value={this.state.assign} onChange={this.handleChange} name="assigned_to" id="assign"/>
                    <br/><br/>
                    <strong>Due Date</strong>
                    <input type="date" value={this.state.due} onChange={this.handleChange} name="due_date" id="due"/>
                    <br/><br/><br/>
                    <Checkbox value="" checked={this.state.completed} onChange={this.handleChange} label="Completed" name="completed" id="completed"/>
                    <br/><br/><br/>
                    <div>
                        <Button id="edit_submit_button"
                                className="add_margin"
                                onClick={this.props.match.params.itemId === "new" ? this.submitNewItem : this.submitChanges}
                        >Submit<Icon right>
                            send
                        </Icon></Button>
                        <Button id="edit_cancel_button"
                                flat
                                className="add_margin"
                                onClick={this.props.history.goBack}
                        >Cancel</Button>
                    </div>
                    <br/>
                </div>

            </div>
        )
    }
}

const style = {
    padding: "20px"
};

const mapStateToProps = (state, ownProps) => {
    const data = ownProps.location.state;
    return {
        item: data.item,
        firestore: state.firestore
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen)