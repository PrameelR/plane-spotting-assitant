import * as types from '../types';
import * as services from '../../services'

export function LoginUserAction(_data) {

    return async (dispatch) => {
        await services.LoginUser(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(LoginUser(data));
            }
            else {
                dispatch(LoginUser(data));
            }
        })
    };
}

export function LoginUser(payload) {
    return {
        type: types.LOGIN_USER,
        payload
    };
};


export function GetLoginUserAction(_data) {

    return async (dispatch) => {
        await services.GetLoginUser().then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(GetLoginUser(data));
            }
            else {
                dispatch(GetLoginUser(data));
            }
        })
    };
}

export function GetLoginUser(payload) {
    return {
        type: types.GET_LOGIN_USER,
        payload
    };
};

export function LogoutUserAction(_data) {

    return async (dispatch) => {
        await services.LogoutUser(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(LogoutUser(null));
            }
            else {
                dispatch(LogoutUser(null));
            }
        })
    };
}

export function LogoutUser(payload) {
    return {
        type: types.LOGOUT_USER,
        payload
    };
};




export function CreateUserAction(_data) {

    return async (dispatch) => {
        await services.CreateUser(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(CreateUser(data));
            }
            else {
                dispatch(CreateUser(data));
            }
        })
    };
}

export function CreateUser(payload) {
    return {
        type: types.CREATE_USER,
        payload
    };
};

export function UpdateUserAction(_data) {

    return async (dispatch) => {
        await services.UpdateUser(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(UpdateUser(data));
            }
            else {
                dispatch(UpdateUser(data));
            }
        })
    };
}

export function UpdateUser(payload) {
    return {
        type: types.UPDATE_USER,
        payload
    };
};


export function DeleteUserAction(_data) {

    return async (dispatch) => {
        await services.DeleteUser(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(DeleteUser(data));
            }
            else {
                dispatch(DeleteUser(data));
            }
        })
    };
}

export function DeleteUser(payload) {
    return {
        type: types.DELETE_USER,
        payload
    };
};


export function GetUserTypesAction() {

    return async (dispatch) => {
        await services.GetUserTypes().then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(GetUserTypes(data));
            }
            else {
                dispatch(GetUserTypes(data));
            }
        })
    };
}

export function GetUserTypes(payload) {
    return {
        type: types.GET_USER_TYPES,
        payload
    };
};



export function SearchUsersAction(_data) {

    return async (dispatch) => {
        await services.SearchUsers(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(SearchUsers(data));
            }
            else {
                dispatch(SearchUsers(data));
            }
        })
    };
}

export function SearchUsers(payload) {
    return {
        type: types.GET_USERS,
        payload
    };
};

export function SetSelectedUser(payload) {
    return {
        type: types.SET_SELECTED_USER,
        payload
    };
};