import * as actionTypes from '../types';


const initialState = {
    logindetails: null,
    createuserstatus: null,
    updateuserstatus: null,
    deleteuserstatus: null,
    userlist: [],
    usertypes: [],
    selecteduser: null,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                logindetails: action.payload,
            };

        case actionTypes.LOGOUT_USER:

            return {
                ...state,
                logindetails: action.payload,
            };

        case actionTypes.GET_LOGIN_USER:
            return {
                ...state,
                logindetails: action.payload,
            };
        case actionTypes.CREATE_USER:
            return {
                ...state,
                createuserstatus: action.payload,
            };
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                updateuserstatus: action.payload,
            };
        case actionTypes.DELETE_USER:
            return {
                ...state,
                deleteuserstatus: action.payload,
            };
        case actionTypes.GET_USER_TYPES:
            return {
                ...state,
                usertypes: action.payload,
            };
        case actionTypes.GET_USERS:
            return {
                ...state,
                userlist: action.payload,
            };
        case actionTypes.SET_SELECTED_USER:
            return {
                ...state,
                selecteduser: action.payload,
            };
        default:
            return state
    }
};