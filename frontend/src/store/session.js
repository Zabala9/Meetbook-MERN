import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_USER = "session/RECEIVE_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async dispatch => {
  const { image, name, lastname, password, email, phoneNumber, city, birthdate, bio, status } = userInfo;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);
  formData.append("city", city);
  formData.append("password", password);
  formData.append("birthdate", birthdate);
  formData.append("bio", bio);
  formData.append("status", status);

  if (image) formData.append("image", image);

    try {  
      const res = await jwtFetch(route, {
        method: "POST",
        body: formData
      });
      const { user, token } = await res.json();
      localStorage.setItem('jwtToken', token);
      return dispatch(receiveCurrentUser(user));
    } catch(err) {
      const res = await err.json();
      if (res.statusCode === 400) {
        return dispatch(receiveErrors(res.errors));
      }
    }
};

export const updateUser = (data) => async dispatch => {
  try{
    const res = await jwtFetch(`/api/users/${data._id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    const user = await res.json();
    dispatch(receiveUser(user));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
  }
};

export const updateProfilePhoto = (data, image) => async dispatch => {
  const { _id, bio, birthdate, city, email, lastname, name, phoneNumber, status } = data;
  const formData = new FormData();
  formData.append("id", _id);
  formData.append("bio", bio);
  formData.append("birthdate", birthdate);
  formData.append("city", city);
  formData.append("email", email);
  formData.append("lastname", lastname);
  formData.append("name", name);
  formData.append("phoneNumber", phoneNumber);
  formData.append("status", status);
  formData.append("image", image);

  try{
    const res = await jwtFetch(`/api/users/${data._id}`, {
      method: "PATCH",
      body: formData,
    });

    const user = await res.json();
    dispatch(receiveUser(user));
  } catch(err){
    const resBody = await err.json();
    if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
  }
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

const initialState = { user: undefined };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return { user: action.currentUser };
      case RECEIVE_USER_LOGOUT:
        return initialState;
      case RECEIVE_USER:
        return { ...state, all: {...state.all, [action.user._id]: action.user }};
      default:
        return state;
    }
};

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

export default sessionReducer;