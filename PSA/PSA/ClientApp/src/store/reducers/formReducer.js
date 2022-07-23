import * as actionTypes from '../types';


const initialState = {
    loading: false,

    isShowRegisterUser: false,
    isShowDeleteUser: false,
    isShowEditUser: false,

    isShowRegisterPlaneMake: false,
    isShowDeletePlaneMake: false,
    isShowEditPlaneMake: false,

    isShowRegisterPlaneModel: false,
    isShowDeletePlaneModel: false,
    isShowEditPlaneModel: false,

    isShowRegisterPlane: false,
    isShowDeletePlane: false,
    isShowEditPlane: false,

    isShowRegisterPlaneSpotting: false,
    isShowDeletePlaneSpotting: false,
    isShowEditPlaneSpotting: false,
};

export function formReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_LOADING:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.HIDE_LOADING:
            return {
                ...state,
                loading: false,
            };

        case actionTypes.OPEN_REGISTER_USER:
            return {
                ...state,
                isShowRegisterUser: true,
            };
        case actionTypes.CLOSE_REGISTER_USER:
            return {
                ...state,
                isShowRegisterUser: false,
            };
        case actionTypes.OPEN_EDIT_USER:
            return {
                ...state,
                isShowEditUser: true,
            };
        case actionTypes.CLOSE_EDIT_USER:
            return {
                ...state,
                isShowEditUser: false,
            };
        case actionTypes.OPEN_DELETE_USER:
            return {
                ...state,
                isShowDeleteUser: true,
            };
        case actionTypes.CLOSE_DELETE_USER:
            return {
                ...state,
                isShowDeleteUser: false,
            };


        case actionTypes.OPEN_CREATE_PLANEMAKE:
            return {
                ...state,
                isShowCreatePlaneMake: true,
            };
        case actionTypes.CLOSE_CREATE_PLANEMAKE:
            return {
                ...state,
                isShowCreatePlaneMake: false,
            };
        case actionTypes.OPEN_EDIT_PLANEMAKE:
            return {
                ...state,
                isShowEditPlaneMake: true,
            };
        case actionTypes.CLOSE_EDIT_PLANEMAKE:
            return {
                ...state,
                isShowEditPlaneMake: false,
            };
        case actionTypes.OPEN_DELETE_PLANEMAKE:
            return {
                ...state,
                isShowDeletePlaneMake: true,
            };
        case actionTypes.CLOSE_DELETE_PLANEMAKE:
            return {
                ...state,
                isShowDeletePlaneMake: false,
            };


        case actionTypes.OPEN_CREATE_PLANEMODEL:
            return {
                ...state,
                isShowCreatePlaneModel: true,
            };
        case actionTypes.CLOSE_CREATE_PLANEMODEL:
            return {
                ...state,
                isShowCreatePlaneModel: false,
            };
        case actionTypes.OPEN_EDIT_PLANEMODEL:
            return {
                ...state,
                isShowEditPlaneModel: true,
            };
        case actionTypes.CLOSE_EDIT_PLANEMODEL:
            return {
                ...state,
                isShowEditPlaneModel: false,
            };
        case actionTypes.OPEN_DELETE_PLANEMODEL:
            return {
                ...state,
                isShowDeletePlaneModel: true,
            };
        case actionTypes.CLOSE_DELETE_PLANEMODEL:
            return {
                ...state,
                isShowDeletePlaneModel: false,
            };


        case actionTypes.OPEN_CREATE_PLANE:
            return {
                ...state,
                isShowCreatePlane: true,
            };
        case actionTypes.CLOSE_CREATE_PLANE:
            return {
                ...state,
                isShowCreatePlane: false,
            };
        case actionTypes.OPEN_EDIT_PLANE:
            return {
                ...state,
                isShowEditPlane: true,
            };
        case actionTypes.CLOSE_EDIT_PLANE:
            return {
                ...state,
                isShowEditPlane: false,
            };
        case actionTypes.OPEN_DELETE_PLANE:
            return {
                ...state,
                isShowDeletePlane: true,
            };
        case actionTypes.CLOSE_DELETE_PLANE:
            return {
                ...state,
                isShowDeletePlane: false,
            };


        case actionTypes.OPEN_CREATE_PLANESPOTTINGS:
            return {
                ...state,
                isShowCreatePlaneSpotting: true,
            };
        case actionTypes.CLOSE_CREATE_PLANESPOTTINGS:
            return {
                ...state,
                isShowCreatePlaneSpotting: false,
            };
        case actionTypes.OPEN_EDIT_PLANESPOTTINGS:
            return {
                ...state,
                isShowEditPlaneSpotting: true,
            };
        case actionTypes.CLOSE_EDIT_PLANESPOTTINGS:
            return {
                ...state,
                isShowEditPlaneSpotting: false,
            };
        case actionTypes.OPEN_DELETE_PLANESPOTTINGS:
            return {
                ...state,
                isShowDeletePlaneSpotting: true,
            };
        case actionTypes.CLOSE_DELETE_PLANESPOTTINGS:
            return {
                ...state,
                isShowDeletePlaneSpotting: false,
            };


        default:
            return state
    }
};