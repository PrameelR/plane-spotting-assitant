import * as types from '../types';
import * as services from '../../services'


export function CreatePlaneMakeAction(_data) {

    return async (dispatch) => {
        await services.CreatePlaneMake(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(CreatePlaneMake(data));
            }
            else {
                dispatch(CreatePlaneMake(data));
            }
        })
    };
}

export function CreatePlaneMake(payload) {
    return {
        type: types.CREATE_PLANEMAKE,
        payload
    };
};

export function UpdatePlaneMakeAction(_data) {

    return async (dispatch) => {
        await services.UpdatePlaneMake(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(UpdatePlaneMake(data));
            }
            else {
                dispatch(UpdatePlaneMake(data));
            }
        })
    };
}

export function UpdatePlaneMake(payload) {
    return {
        type: types.UPDATE_PLANEMAKE,
        payload
    };
};


export function DeletePlaneMakeAction(_data) {

    return async (dispatch) => {
        await services.DeletePlaneMake(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(DeletePlaneMake(data));
            }
            else {
                dispatch(DeletePlaneMake(data));
            }
        })
    };
}

export function DeletePlaneMake(payload) {
    return {
        type: types.DELETE_PLANEMAKE,
        payload
    };
};


export function SearchPlaneMakesAction(_data) {

    return async (dispatch) => {
        await services.SearchPlaneMakes(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(SearchPlaneMakes(data));
            }
            else {
                dispatch(SearchPlaneMakes(data));
            }
        })
    };
}

export function SearchPlaneMakes(payload) {
    return {
        type: types.GET_PLANEMAKES,
        payload
    };
};

export function SetSelectedPlaneMake(payload) {
    return {
        type: types.SET_SELECTED_PLANEMAKE,
        payload
    };
};





export function CreatePlaneModelAction(_data) {

    return async (dispatch) => {
        await services.CreatePlaneModel(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(CreatePlaneModel(data));
            }
            else {
                dispatch(CreatePlaneModel(data));
            }
        })
    };
}

export function CreatePlaneModel(payload) {
    return {
        type: types.CREATE_PLANEMODEL,
        payload
    };
};

export function UpdatePlaneModelAction(_data) {

    return async (dispatch) => {
        await services.UpdatePlaneModel(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(UpdatePlaneModel(data));
            }
            else {
                dispatch(UpdatePlaneModel(data));
            }
        })
    };
}

export function UpdatePlaneModel(payload) {
    return {
        type: types.UPDATE_PLANEMODEL,
        payload
    };
};


export function DeletePlaneModelAction(_data) {

    return async (dispatch) => {
        await services.DeletePlaneModel(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(DeletePlaneModel(data));
            }
            else {
                dispatch(DeletePlaneModel(data));
            }
        })
    };
}

export function DeletePlaneModel(payload) {
    return {
        type: types.DELETE_PLANEMODEL,
        payload
    };
};


export function SearchPlaneModelsAction(_data) {

    return async (dispatch) => {
        await services.SearchPlaneModels(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(SearchPlaneModels(data));
            }
            else {
                dispatch(SearchPlaneModels(data));
            }
        })
    };
}

export function SearchPlaneModels(payload) {
    return {
        type: types.GET_PLANEMODELS,
        payload
    };
};

export function SetSelectedPlaneModel(payload) {
    return {
        type: types.SET_SELECTED_PLANEMODEL,
        payload
    };
};





export function CreatePlaneAction(_data) {

    return async (dispatch) => {
        await services.CreatePlane(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(CreatePlane(data));
            }
            else {
                dispatch(CreatePlane(data));
            }
        })
    };
}

export function CreatePlane(payload) {
    return {
        type: types.CREATE_PLANE,
        payload
    };
};

export function UpdatePlaneAction(_data) {

    return async (dispatch) => {
        await services.UpdatePlane(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(UpdatePlane(data));
            }
            else {
                dispatch(UpdatePlane(data));
            }
        })
    };
}

export function UpdatePlane(payload) {
    return {
        type: types.UPDATE_PLANE,
        payload
    };
};


export function DeletePlaneAction(_data) {

    return async (dispatch) => {
        await services.DeletePlane(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(DeletePlane(data));
            }
            else {
                dispatch(DeletePlane(data));
            }
        })
    };
}

export function DeletePlane(payload) {
    return {
        type: types.DELETE_PLANE,
        payload
    };
};


export function SearchPlanesAction(_data) {

    return async (dispatch) => {
        await services.SearchPlanes(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(SearchPlanes(data));
            }
            else {
                dispatch(SearchPlanes(data));
            }
        })
    };
}

export function SearchPlanes(payload) {
    return {
        type: types.GET_PLANES,
        payload
    };
};

export function SetSelectedPlane(payload) {
    return {
        type: types.SET_SELECTED_PLANE,
        payload
    };
};





export function CreatePlaneSpottingAction(_data) {

    return async (dispatch) => {
        await services.CreatePlaneSpotting(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(CreatePlaneSpotting(data));
            }
            else {
                dispatch(CreatePlaneSpotting(data));
            }
        })
    };
}

export function CreatePlaneSpotting(payload) {
    return {
        type: types.CREATE_PLANESPOTTINGS,
        payload
    };
};

export function UpdatePlaneSpottingAction(_data) {

    return async (dispatch) => {
        await services.UpdatePlaneSpotting(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(UpdatePlaneSpotting(data));
            }
            else {
                dispatch(UpdatePlaneSpotting(data));
            }
        })
    };
}

export function UpdatePlaneSpotting(payload) {
    return {
        type: types.UPDATE_PLANESPOTTINGS,
        payload
    };
};


export function DeletePlaneSpottingAction(_data) {

    return async (dispatch) => {
        await services.DeletePlaneSpotting(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(DeletePlaneSpotting(data));
            }
            else {
                dispatch(DeletePlaneSpotting(data));
            }
        })
    };
}

export function DeletePlaneSpotting(payload) {
    return {
        type: types.DELETE_PLANESPOTTINGS,
        payload
    };
};


export function SearchPlaneSpottingsAction(_data) {

    return async (dispatch) => {
        await services.SearchPlaneSpottings(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(SearchPlaneSpottings(data));
            }
            else {
                dispatch(SearchPlaneSpottings(data));
            }
        })
    };
}

export function SearchPlaneSpottings(payload) {
    return {
        type: types.GET_PLANESPOTTINGS,
        payload
    };
};

export function SetSelectedPlaneSpotting(payload) {
    return {
        type: types.SET_SELECTED_PLANESPOTTING,
        payload
    };
};


export function RecentPlaneSpottingsAction(_data) {

    return async (dispatch) => {
        await services.RecentPlaneSpottings(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(RecentPlaneSpottings(data));
            }
            else {
                dispatch(RecentPlaneSpottings(data));
            }
        })
    };
}

export function RecentPlaneSpottings(payload) {
    return {
        type: types.SET_RECENT_PLANE_SPOTTINGS,
        payload
    };
};


export function PlaneSpottingStatsByMakeAction(_data) {
    return async (dispatch) => {
        await services.PlaneSpottingStatsByMake(_data).then((response) => {

            var data = response.data;
           
            if (response.statusText === "OK") {

                dispatch(PlaneSpottingStatsByMake({ "selection": _data.selection, "data": data }));
            }
            else {
                dispatch(PlaneSpottingStatsByMake({ "selection": _data.selection, "data": [] }));
            }
        })
    };
}

export function PlaneSpottingStatsByMake(payload) {
    return {
        type: types.SET_PLANE_SPOTTINGS_BY_MAKE,
        payload
    };
};



export function PlaneSpottingStatsByModelAction(_data) {

    return async (dispatch) => {
        await services.PlaneSpottingStatsByModel(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(PlaneSpottingStatsByModel({ "selection": _data.selection, "data": data }));
            }
            else {
                dispatch(PlaneSpottingStatsByModel({ "selection": _data.selection, "data": [] }));
            }
        })
    };
}

export function PlaneSpottingStatsByModel(payload) {
    return {
        type: types.SET_PLANE_SPOTTINGS_BY_MODEL,
        payload
    };
};



export function PlaneSpottingStatsByPlaneAction(_data) {

    return async (dispatch) => {
        await services.PlaneSpottingStatsByPlane(_data).then((response) => {

            var data = response.data;

            if (response.statusText === "OK") {


                dispatch(PlaneSpottingStatsByPlane({ "selection": _data.selection, "data": data }));
            }
            else {
                dispatch(PlaneSpottingStatsByPlane({ "selection": _data.selection, "data": [] }));
            }
        })
    };
}

export function PlaneSpottingStatsByPlane(payload) {
    return {
        type: types.SET_PLANE_SPOTTINGS_BY_PLANE,
        payload
    };
};
