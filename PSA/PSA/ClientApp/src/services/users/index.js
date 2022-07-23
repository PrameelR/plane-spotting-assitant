
import axiosinstanceget from '../axiosinstances/instanceget';
import axiosinstancepost from '../axiosinstances/instancepost';

export async function LoginUser(_data) {

    var data = {
        "email": _data.email,
        "password": _data.password
    };


    var _apipath = process.env.REACT_APP_LOGIN_USER;

    return axiosinstancepost.post(_apipath, data);


}

export async function LogoutUser(_data) {

    var data = {
        "email": _data.email
    };


    var _apipath = process.env.REACT_APP_LOGOUT_USER;

    return axiosinstancepost.post(_apipath, data);


}

export async function GetLoginUser() {

    var _apipath = process.env.REACT_APP_GET_LOGIN_USER;

    return axiosinstanceget.get(_apipath);


}

export async function CreateUser(_data) {

    var data = {
        "name": _data.name,
        "email": _data.email,
        "password": _data.password,
        "usertypeid": _data.usertypeid
    };


    var _apipath = process.env.REACT_APP_CREATE_USER;

    return axiosinstancepost.post(_apipath, data);


}

export async function UpdateUser(_data) {

    var data = {
        "userid": _data.userid,
        "name": _data.name,
        "usertypeid": _data.usertypeid
    };


    var _apipath = process.env.REACT_APP_UPDATE_USER;

    return axiosinstancepost.post(_apipath, data);


}

export async function DeleteUser(_data) {

    var data = {
        "userid": _data.userid
    };


    var _apipath = process.env.REACT_APP_DELETE_USER;

    return axiosinstancepost.post(_apipath, data);


}

export async function GetUserTypes(_data) {

    var _apipath = process.env.REACT_APP_GET_USER_TYPES;

    return axiosinstanceget.get(_apipath);


}


export async function SearchUsers(_data) {

    var data = {
        "searchtext": _data.searchtext,
        "usertypeid": _data.usertypeid
    };


    var _apipath = process.env.REACT_APP_GET_USERS;

    return axiosinstancepost.post(_apipath, data);


}

