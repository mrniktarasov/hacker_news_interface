import { combineReducers } from 'redux';
import news from './news';
import comments from './comments';

export default combineReducers({
    news,
    comments,
});