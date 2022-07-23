
import axiosinstanceget from '../axiosinstances/instanceget';
import axiosinstancepost from '../axiosinstances/instancepost';


export async function CreatePlaneMake(_data) {

    var data = {
        "name": _data.name
    };


    var _apipath = process.env.REACT_APP_CREATE_PLANEMAKE;

    return axiosinstancepost.post(_apipath, data);


}

export async function UpdatePlaneMake(_data) {

    var data = {
        "makeid": _data.planemakeid,
        "name": _data.name
    };


    var _apipath = process.env.REACT_APP_UPDATE_PLANEMAKE;

    return axiosinstancepost.post(_apipath, data);


}

export async function DeletePlaneMake(_data) {

    var data = {
        "makeid": _data.planemakeid
    };


    var _apipath = process.env.REACT_APP_DELETE_PLANEMAKE;

    return axiosinstancepost.post(_apipath, data);


}


export async function SearchPlaneMakes(_data) {

    var data = {
        "searchtext": _data.searchtext
    };


    var _apipath = process.env.REACT_APP_GET_PLANEMAKES;

    return axiosinstancepost.post(_apipath, data);


}


export async function CreatePlaneModel(_data) {

    var data = {
        "name": _data.name,
        "makeid": _data.makeid,
    };


    var _apipath = process.env.REACT_APP_CREATE_PLANEMODEL;

    return axiosinstancepost.post(_apipath, data);


}

export async function UpdatePlaneModel(_data) {

    var data = {
        "modelid": _data.planemodelid,
        "name": _data.name,
        "makeid": _data.makeid,
    };


    var _apipath = process.env.REACT_APP_UPDATE_PLANEMODEL;

    return axiosinstancepost.post(_apipath, data);


}

export async function DeletePlaneModel(_data) {

    var data = {
        "modelid": _data.planemodelid
    };


    var _apipath = process.env.REACT_APP_DELETE_PLANEMODEL;

    return axiosinstancepost.post(_apipath, data);


}


export async function SearchPlaneModels(_data) {

    var data = {
        "searchtext": _data.searchtext,
        "makeid": _data.makeid
    };


    var _apipath = process.env.REACT_APP_GET_PLANEMODELS;

    return axiosinstancepost.post(_apipath, data);


}




export async function CreatePlane(_data) {

    var data = {
        "referenceprefix": _data.referenceprefix,
        "referencesuffix": _data.referencesuffix,
        "modelid": _data.modelid,
        "makeid": _data.makeid,
        "image": _data.image,
    };


    var _apipath = process.env.REACT_APP_CREATE_PLANE;

    return axiosinstancepost.post(_apipath, data);


}

export async function UpdatePlane(_data) {

    var data = {
        "planeid": _data.planeid,
        "referenceprefix": _data.referenceprefix,
        "referencesuffix": _data.referencesuffix,
        "modelid": _data.modelid,
        "makeid": _data.makeid,
        "image": _data.image,
    };


    var _apipath = process.env.REACT_APP_UPDATE_PLANE;

    return axiosinstancepost.post(_apipath, data);


}

export async function DeletePlane(_data) {

    var data = {
        "planeid": _data.planeid
    };


    var _apipath = process.env.REACT_APP_DELETE_PLANE;

    return axiosinstancepost.post(_apipath, data);


}


export async function SearchPlanes(_data) {

    var data = {
        "searchtext": _data.searchtext,
        "makeid": _data.makeid,
        "modelid": _data.modelid
    };


    var _apipath = process.env.REACT_APP_GET_PLANES;

    return axiosinstancepost.post(_apipath, data);


}



export async function CreatePlaneSpotting(_data) {

    var data = {
        "planeid": _data.planeid,
        "location": _data.location,
        "date": _data.date,
        "image": _data.image,
    };


    var _apipath = process.env.REACT_APP_CREATE_PLANESPOTTING;

    return axiosinstancepost.post(_apipath, data);


}

export async function UpdatePlaneSpotting(_data) {

    var data = {
        "planespottingid": _data.planespottingid,
        "planeid": _data.planeid,
        "location": _data.location,
        "date": _data.date,
        "image": _data.image,
    };


    var _apipath = process.env.REACT_APP_UPDATE_PLANESPOTTING;

    return axiosinstancepost.post(_apipath, data);


}

export async function DeletePlaneSpotting(_data) {

    var data = {
        "planespottingid": _data.planespottingid
    };


    var _apipath = process.env.REACT_APP_DELETE_PLANESPOTTING;

    return axiosinstancepost.post(_apipath, data);


}


export async function SearchPlaneSpottings(_data) {

    var data = {
        "searchtext": _data.searchtext,
        "makeid": _data.makeid,
        "modelid": _data.modelid,
        "planeid": _data.planeid,
        "fromdate": _data.fromdate,
        "todate": _data.todate
    };


    var _apipath = process.env.REACT_APP_GET_PLANESPOTTINGS;

    return axiosinstancepost.post(_apipath, data);


}




export async function RecentPlaneSpottings(_data) {

    var data = {
        "count": _data.count,
    };


    var _apipath = process.env.REACT_APP_RECENT_PLANESPOTTINGS;

    return axiosinstancepost.post(_apipath, data);


}




export async function PlaneSpottingStatsByMake(_data) {

    var data = {
        "fromdate": _data.fromdate,
        "todate": _data.todate,
    };


    var _apipath = process.env.REACT_APP_STAT_PLANESPOTTINGS_BY_MAKE;

    return axiosinstancepost.post(_apipath, data);


}



export async function PlaneSpottingStatsByModel(_data) {

    var data = {
        "fromdate": _data.fromdate,
        "todate": _data.todate,
    };


    var _apipath = process.env.REACT_APP_STAT_PLANESPOTTINGS_BY_MODEL;

    return axiosinstancepost.post(_apipath, data);


}



export async function PlaneSpottingStatsByPlane(_data) {

    var data = {
        "fromdate": _data.fromdate,
        "todate": _data.todate,
    };


    var _apipath = process.env.REACT_APP_STAT_PLANESPOTTINGS_BY_PLANE;

    return axiosinstancepost.post(_apipath, data);


}