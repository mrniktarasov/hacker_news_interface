import {
    GET_NEWS_REQUEST,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_SUCCESS,
} from '../constants/ActionTypes';
import {
    API_URL_ITEM,
    API_URL_NEW_NEWS,
    NEWS_QUANTITY } from '../constants/Constants';
import validateAPI from "../validations";


const getNewsStarted = () =>({
    type: GET_NEWS_REQUEST,
});

const getNewsSuccess = (news) => ({
    type: GET_NEWS_SUCCESS,
    payload: news,
});

const getNewsFailure = (error) => ({
    type: GET_NEWS_FAILURE,
    payload: {
        error,
    },
});

const getCommentsStarted = () => ({
    type: GET_COMMENTS_REQUEST,
});

const getCommentsSuccess = (comments) => ({
    type: GET_COMMENTS_SUCCESS,
    payload: comments,
});

const getCommentsFailure = (error) => ({
    type: GET_COMMENTS_FAILURE,
    payload: {
        error,
    }
});


export function getNews() {
    return (dispatch) => {
        dispatch(getNewsStarted());
        return fetch(API_URL_NEW_NEWS)
            .then((response) => response.json())
            .then((data) => {
                Promise.allSettled(data.slice(0, NEWS_QUANTITY).map((code) => {
                    return fetch(`${API_URL_ITEM}${code}.json`)
                        .then((response) => response.json())
                        .then((response) => validateAPI(response))
                }))
                    .then((news) => {
                        dispatch(getNewsSuccess(news));
                    })
            })
            .catch((error) => {
                dispatch(getNewsFailure(error));
            })
    };
}

export function getComments(kids) {
    return async (dispatch) => {
        dispatch(getCommentsStarted());
        return await Promise.allSettled(kids.map((code) => {
                return fetch(`${API_URL_ITEM}${code}.json`)
                    .then((response) => response.json())
                    .then((response) => validateAPI(response))
            })
        ).then((comments) => {
            dispatch(getCommentsSuccess(comments))
        }).catch((error) => {
            dispatch(getCommentsFailure(error));
        })
    };
}
