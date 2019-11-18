import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from "react-router-dom";


class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        //console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={{
                            pathname: todoList.id+"/" + item.id,
                            state: {
                                item: item
                            }
                        }} >
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );})
                }
                <div className="card z-depth-0 todo-list-link pink-lighten-3">
                    <div className="card-content grey-text text-darken-3">
                        <h6>asd</h6>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);