import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_SEARCH = "search/RECEIVE_SEARCH";
const RECEIVE_SINGLE_SEARCH = "search/RECEIVE_SINGLE_SEARCH";
const CLEAR_SEARCH_ERRORS = "search/CLEAR_SEARCH_ERRORS";
const RECEIVE_SEARCH_ERRORS = "search/RECEIVE_SEARCH_ERRORS";

const receiveSearch = users => ({
    type: RECEIVE_SEARCH,
    users
});

const receiveSingleSearch = user => ({
    type: RECEIVE_SINGLE_SEARCH,
    user
});

const receiveErrors = errors => ({
    type: RECEIVE_SEARCH_ERRORS,
    errors 
});

export const clearSearchErrors = errors => ({
    type: CLEAR_SEARCH_ERRORS,
    errors
});

export const fetchSearch = (data) => async dispatch => {
    try {
        // console.log(data, 'data search');
        const { name, lastname } = data;

        const res = await jwtFetch(`/api/users/search?name=${name}&lastname=${lastname}`);
        const users = await res.json();
        dispatch(receiveSearch(users));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const fetchSingleSearch = (userId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/users/${userId}`);
        const user = await res.json();
        dispatch(receiveSingleSearch(user));
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

const searchReducer = (state = { all: {}, single: [] }, action) => {
    switch(action.type){
        case RECEIVE_SEARCH:
            return {...state, all: action.users };
        case RECEIVE_SINGLE_SEARCH:
            return { ...state, single: action.user };
        case RECEIVE_USER_LOGOUT:
            return { ...state };
        default:
            return state;
    }
};

export default searchReducer;