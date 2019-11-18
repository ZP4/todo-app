import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import {getFirestore} from "redux-firestore";

class TodoListLinks extends React.Component {

    // changeListsIndex = (e) => {
    //     const firestore = getFirestore();
    //     let a;
    //     let d = firestore.collection('todoLists');
    //     d.ref.get().then((querySnapshot) => {
    //         a = querySnapshot.docs.map(doc => doc.data());
    //     });
    //     console.log(d);
    // };

    render() {
        const todoLists = this.props.todoLists;
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} >
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
        firestore: state.firestore
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);