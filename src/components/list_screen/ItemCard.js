import React from 'react';
import { Button } from 'react-materialize';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from 'react-redux';
import { compose } from "redux";

class ItemCard extends React.Component {
    handled = (e) => {
        e.preventDefault();
        console.log(this.props.item.key);
        console.log(this.props.todoList.id);
    };

    moveUp = (e) => {

    };

    moveDown = (e) => {

    };

    deleteItem = (e) => {
        e.preventDefault();
        const firestore = this.props.firestore;
        let itemArray;
        firestore.collection('todoLists').doc(this.props.todoList.id).get()
            .then((e) => {
                itemArray = e.get('items');
                for(let x = 0; x < itemArray.length; x++) {
                    if(itemArray[x].key === this.props.item.key) {
                        itemArray.splice(x, 1);
                    }
                }
            }).finally((e) => {
            firestore.collection('todoLists').doc(this.props.todoList.id).update({
                items: itemArray
            });
        })
    };

    render() {

        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <span className="card-content"><b>Assigned To: </b>{item.assigned_to}</span>
                    <span className="card-content"><b>Date: </b>{item.due_date}</span>
                    <span className="card-content">{item.completed ? "Completed" : "Pending"}</span>
                    <div className="card-content right">
                        <Button onClick={this.handled}>Up</Button>
                        <Button onClick={this.handled}>DOwn</Button>
                        <Button onClick={this.deleteItem}>Remove</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    connect(null),
    firestoreConnect([
        {collection: 'todoLists'},
    ]),
)(ItemCard);