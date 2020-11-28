import {
    GET_NEWS_REQUEST,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
    loading: false,
    newsData: [],
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                newsData: action.payload,
                error: null,
            };
        case GET_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}