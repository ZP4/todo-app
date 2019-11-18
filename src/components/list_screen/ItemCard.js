import React from 'react';
import { Button } from 'react-materialize';
import {firestoreConnect} from "react-redux-firebase";
import {connect} from 'react-redux';
import { compose } from "redux";

class ItemCard extends React.Component {

    find(arr, key) {
        for(let i = 0; i<arr.length; i++) {
            if(key === arr[i].key) {
                return i;
            }
        }
    }

    swap(input, index_A, index_B) {
        let temp = input[index_A];

        input[index_A] = input[index_B];
        input[index_B] = temp;
    }

    sort(arr) {
        arr.forEach((el, index) => {
            el.key = index;
        })
    }


    moveUp = (e) => {
        e.preventDefault();
        const firestore = this.props.firestore;
        let itemArray;
        firestore.collection('todoLists').doc(this.props.todoList.id).get()
            .then((e) => {
                itemArray = e.get('items');
                let index = this.find(itemArray, this.props.item.key);
                console.log(index);
                console.log("before "+ itemArray[index]);
                this.swap(itemArray, index, index-1);
                console.log("after  "+ itemArray[index]);
            }).finally((e) => {

                if(!(this.props.item.key === 0)) {
                    this.sort(itemArray);
                    firestore.collection('todoLists').doc(this.props.todoList.id).update({
                        items: itemArray
                    });
                }
        })
    };

    moveDown = (e) => {
        e.preventDefault();
        console.log(this.props.item);
        const firestore = this.props.firestore;
        let itemArray;
        firestore.collection('todoLists').doc(this.props.todoList.id).get()
            .then((e) => {
                itemArray = e.get('items');
                let index = this.find(itemArray, this.props.item.key);
                console.log(index);
                console.log("before "+ itemArray[index]);
                this.swap(itemArray, index, index+1);
                console.log("after  "+ itemArray[index]);
            }).finally((e) => {
                if(!(this.props.todoList.items.length-1 === this.props.item.key)) {
                    this.sort(itemArray);
                    firestore.collection('todoLists').doc(this.props.todoList.id).update({
                        items: itemArray
                    });
                }
        })
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
                this.sort(itemArray);
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
                    <span
                        className="card-content"
                        style={item.completed ? completedGreen : completedRed}
                    >{item.completed ? "Completed" : "Pending"}</span>
                    <div className="card-content right">
                        <Button onClick={this.moveUp} style={this.props.item.key === 0 ? disabled : null}>Up</Button>
                        <Button onClick={this.moveDown} style={this.props.todoList.items.length-1 === this.props.item.key ? disabled : null}>Down</Button>
                        <Button onClick={this.deleteItem} >Remove</Button>
                    </div>
                </div>

            </div>
        );
    }
}
const completedRed = {
    color: "red"
};

const completedGreen = {
    color: "green"
};

const disabled = {
    backgroundColor: '#929292'
};




export default compose(
    connect(null),
    firestoreConnect([
        {collection: 'todoLists'},
    ]),
)(ItemCard);