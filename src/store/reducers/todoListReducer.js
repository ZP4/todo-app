const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO_LIST':
            console.log("Create new todolist");
            return state;
        case 'CREATE_TODO_LIST_ERROR':
            console.log("Create new todolist ERROR");
            return state;
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        default:
            return state;
    }
};

export default todoListReducer;