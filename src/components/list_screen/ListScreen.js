import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        desc: false,
        date: false,
        stat: false
    };

    handleChange = (e) => {
        const { target } = e;
        const firestore = this.props.firestore;
        console.log(target.id);
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            [target.id]: target.value
        })

    };

    deleteList = (e) => {
        const { target } = e;
        const firestore = this.props.firestore;
        firestore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.goBack();

    };

    sort = (e) => {
        const {target} = e;
        let arr = this.props.todoList.items;
        let firestore = this.props.firestore;
        if(target.id === "desc") {
            arr.sort((a,b) => a.description.localeCompare(b.description));
            if(this.state.desc) {
                arr.reverse();
                this.setState({
                    desc: false,
                    date: false,
                    stat: false
                })
            }
            else {
                this.setState({
                    desc: true
                })
            }
        }
        if(target.id === 'date') {
            arr.sort((a,b) => a.due_date.localeCompare(b.due_date));
            if(this.state.date) {
                arr.reverse();
                this.setState({
                    desc: false,
                    date: false,
                    stat: false
                })
            }
            else {
                this.setState({
                    date: true
                })
            }
        }
        if(target.id === "stat") {
            arr.sort(function(x, y) {
                return (x.completed === y.completed)? 0 : x.completed? -1 : 1;
            });
            if(this.state.stat) {
                arr.reverse();
                this.setState({
                    desc: false,
                    date: false,
                    stat: false
                })
            }
            else {
                this.setState({
                    stat: true
                })
            }
        }

        arr.forEach((el, index) => {
            el.key = index;
        });
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: arr
        });
    };

    render() {

        const auth = this.props.auth;
        const todoList = this.props.todoList;
        //console.log(this.props.match.url);
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div >
                <br/>
                <div className="container white rounded_corner padding"  >

                        <h3 className="grey-text text-darken-3">Todo List</h3>

                        <div className="input-field">
                            <label htmlFor="email" className="active">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password" className="active">Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                        </div>



                </div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col s4 push-s8">
                            <Link to={{
                                pathname: todoList.id+"/new" ,
                                state: {
                                    item: {
                                        key: todoList.items.length,
                                        description: '',
                                        due_date: '',
                                        assigned_to: '',
                                        completed: false
                                    }
                                }
                            }}>
                                <Button className="add_margin">add item<Icon right large>add_box</Icon></Button>
                            </Link>
                            <Modal className="add_margin" header="Delete List?" trigger={<Button>Delete List <Icon right large >delete_forever</Icon></Button>}>
                                <br/>
                                <span>Do you want to delete the list?</span>
                                <br/><br/>
                                <span>The action is irreversible </span>
                                <br/><br/><br/>
                                <div>
                                    <Button className="modal-close" waves="red" type="submit" onClick={this.deleteList}>
                                        Yes
                                        <Icon right>
                                            send
                                        </Icon>
                                    </Button>
                                    <Button className="modal-close" flat waves="light">
                                        No
                                    </Button>
                                </div>

                            </Modal>
                        </div>
                        <div className="col s8 pull-s4">
                            <Button id="desc" className="add_margin" onClick={this.sort}>Description<Icon onClick={this.sort} right>{this.state.desc ? "arrow_drop_up" : "arrow_drop_down"}</Icon></Button>
                            <Button id="date" className="add_margin" onClick={this.sort}>Date<Icon onClick={this.sort} right>{this.state.date ? "arrow_drop_up" : "arrow_drop_down"}</Icon></Button>
                            <Button id="stat" className="add_margin" onClick={this.sort}>status<Icon onClick={this.sort} right>{this.state.stat ? "arrow_drop_up" : "arrow_drop_down"}</Icon></Button>

                        </div>


                    </div>


                </div>

                <div className="container">
                    <ItemsList todoList={todoList} listId={this.props.id} />
                </div>


            </div>


        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;
  return {
    todoList,
    auth: state.firebase.auth,
    firestore: state.firestore
  };
};


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);