import {
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
    loading: false,
    comments: [],
    error: null,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload,
                error: null,
            };
        case GET_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}