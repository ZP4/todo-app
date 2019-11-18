import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import {createTodoList} from "../../store/actions/actionCreators";

class HomeScreen extends Component {

    handleNewList = (e) => {
        let date = new Date();
        let le = 0;
        if(this.props.todoLists === null) {
            le = 0;
        }
        else {
            le = Object.keys(this.props.todoLists).length;
        }
        this.props.createTodoList({
            owner: "unknown",
            name: "unknown",
            items: [],
            key: le,
            time: date.toString()
        })
    };

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.data.todoLists
    };
};

const mapDispatchToProps = dispatch => ({
    createTodoList: (todolist) => dispatch(createTodoList(todolist)),
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['time', 'desc']},
    ]),
)(HomeScreen);