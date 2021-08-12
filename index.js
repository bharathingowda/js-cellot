// Import stylesheets
import './style.css';

//store, action, reducer, dispatch, subscribe

import {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware
} from 'redux';

import logger from 'redux-logger';
import Thunk from 'redux-thunk';

const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const ADD_REVIEW = 'ADD_REVIEW';
const ADD_USERS = 'ADD_USERS';

const addComment = msg => {
  return {
    type: ADD_COMMENT,
    msg
  };
};

const editComment = (msg, idx) => {
  return {
    type: EDIT_COMMENT,
    idx,
    msg
  };
};

const deleteComment = idx => {
  return {
    type: DELETE_COMMENT,
    idx
  };
};

const addReview = msg => {
  return {
    type: ADD_REVIEW,
    msg
  };
};

const addUser = users => {
  return {
    type: ADD_USERS,
    users
  };
};

//pure function
const initialComments = [];
const reducerFun = (state = initialComments, action) => {
  console.log('reducerComment');
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, { text: action.msg }];
    case EDIT_COMMENT:
      const { idx, msg } = action;
      return [...state.slice(0, idx), { text: msg }, ...state.slice(idx + 1)];
    case DELETE_COMMENT:
      const { idx: idx1 } = action;
      return [...state.slice(0, idx1), ...state.slice(idx1 + 1)];
    default:
      return state;
  }
};

const initialReview = [];
const reducerFunReview = (state = initialReview, action) => {
  console.log('reducerReview');
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, { text: action.msg }];
    default:
      return state;
  }
};

const users = [];
const reducerUser = (state = users, action) => {
  switch (action.type) {
    case ADD_USERS:
      return action.users;
    default:
      return state;
  }
};

const reducerRoot = combineReducers({
  comments: reducerFun,
  reviews: reducerFunReview,
  users: reducerUser
});

const store = createStore(reducerRoot, applyMiddleware(Thunk));

const asyncActionCreator = () => {
  return dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => {
        dispatch(addUser(res));
      });
  };
};

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addComment('new message'));
// store.dispatch(addComment("second message"));
// store.dispatch(addComment("Third message"));
// store.dispatch(editComment("first message", 1));
// store.dispatch(deleteComment(0));

const actioncreator = bindActionCreators(addComment, store.dispatch);

actioncreator('newmessage');
actioncreator('new mswyfgwjehfgjw');

store.dispatch(asyncActionCreator());
