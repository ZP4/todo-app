import React from 'react';
import {getFirestore} from "redux-firestore";
import {Card} from 'react-materialize';
import moment from 'moment';

class TodoListCard extends React.Component {
    changeListsIndex = (e) => {
        let date = new Date();
        let firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            time: date.toString()
        })
    };
    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link" onClick={this.changeListsIndex}>
                <Card
                    className="teal darken-1 z-depth-1 hoverable"
                    textClassName="white-text"
                    title={todoList.name}
                    actions={<span className="blue-grey-text text-lighten-4">{moment(todoList.time).calendar()}</span>}
                >
                    <span className="grey-text text-lighten-1">Owner: {todoList.owner}</span>
                </Card>
            </div>
        );
    }
}
export default TodoListCard;