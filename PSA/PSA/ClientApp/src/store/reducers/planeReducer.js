import * as actionTypes from '../types';


const initialState = {
    createplanemakestatus: null,
    updateplanemakestatus: null,
    deleteplanemakestatus: null,
    planemakelist: [],
    selectedplanemake: null,

    createplanemodelstatus: null,
    updateplanemodelstatus: null,
    deleteplanemodelstatus: null,
    planemodellist: [],
    selectedplanemodel: null,

    createplanestatus: null,
    updateplanestatus: null,
    deleteplanestatus: null,
    planelist: [],
    selectedplane: null,

    createplanespottingstatus: null,
    updateplanespottingstatus: null,
    deleteplanespottingstatus: null,
    planespottinglist: [],
    selectedplanespotting: null,

    recentplanespotting: [],
    spottingsbymake: { "selection": { label: 'This week', key: '3', },"data":[]},
    spottingsbymodel: { "selection": { label: 'This week', key: '3', }, "data": [] },
    spottingsbyplane: { "selection": { label: 'This week', key: '3', }, "data": [] },
};

export function planeReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CREATE_PLANEMAKE:
            return {
                ...state,
                createplanemakestatus: action.payload,
            };
        case actionTypes.UPDATE_PLANEMAKE:
            return {
                ...state,
                updateplanemakestatus: action.payload,
            };
        case actionTypes.DELETE_PLANEMAKE:
            return {
                ...state,
                deleteplanemakestatus: action.payload,
            };
        case actionTypes.GET_PLANEMAKES:
            return {
                ...state,
                planemakelist: action.payload,
            };
        case actionTypes.SET_SELECTED_PLANEMAKE:
            return {
                ...state,
                selectedplanemake: action.payload,
            };


        case actionTypes.CREATE_PLANEMODEL:
            return {
                ...state,
                createplanemodelstatus: action.payload,
            };
        case actionTypes.UPDATE_PLANEMODEL:
            return {
                ...state,
                updateplanemodelstatus: action.payload,
            };
        case actionTypes.DELETE_PLANEMODEL:
            return {
                ...state,
                deleteplanemodelstatus: action.payload,
            };
        case actionTypes.GET_PLANEMODELS:
            return {
                ...state,
                planemodellist: action.payload,
            };
        case actionTypes.SET_SELECTED_PLANEMODEL:
            return {
                ...state,
                selectedplanemodel: action.payload,
            };


        case actionTypes.CREATE_PLANE:
            return {
                ...state,
                createplanestatus: action.payload,
            };
        case actionTypes.UPDATE_PLANE:
            return {
                ...state,
                updateplanestatus: action.payload,
            };
        case actionTypes.DELETE_PLANE:
            return {
                ...state,
                deleteplanestatus: action.payload,
            };
        case actionTypes.GET_PLANES:
            return {
                ...state,
                planelist: action.payload,
            };
        case actionTypes.SET_SELECTED_PLANE:
            return {
                ...state,
                selectedplane: action.payload,
            };


        case actionTypes.CREATE_PLANESPOTTINGS:
            return {
                ...state,
                createplanespottingstatus: action.payload,
            };
        case actionTypes.UPDATE_PLANESPOTTINGS:
            return {
                ...state,
                updateplanespottingstatus: action.payload,
            };
        case actionTypes.DELETE_PLANESPOTTINGS:
            return {
                ...state,
                deleteplanespottingstatus: action.payload,
            };
        case actionTypes.GET_PLANESPOTTINGS:
            return {
                ...state,
                planespottinglist: action.payload,
            };
        case actionTypes.SET_SELECTED_PLANESPOTTING:
            return {
                ...state,
                selectedplanespotting: action.payload,
            };

        case actionTypes.SET_RECENT_PLANE_SPOTTINGS:
            return {
                ...state,
                recentplanespotting: action.payload,
            };

        case actionTypes.SET_PLANE_SPOTTINGS_BY_MAKE:
            return {
                ...state,
                spottingsbymake: action.payload,
            };

        case actionTypes.SET_PLANE_SPOTTINGS_BY_MODEL:
            return {
                ...state,
                spottingsbymodel: action.payload,
            };

        case actionTypes.SET_PLANE_SPOTTINGS_BY_PLANE:
            return {
                ...state,
                spottingsbyplane: action.payload,
            };

        default:
            return state
    }
};