import { COMMENT_LIST_REQUEST, COMMENT_LIST_RECEIVED, COMMENT_LIST_ERROR, COMMENT_LIST_UNLOAD } from "../actions/constants";

export default(state = {
    commentList: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case COMMENT_LIST_RECEIVED:
            return {
                ...state,
                commentList: action.data['hydra:member'],
                isFetching: false
            };
        case COMMENT_LIST_UNLOAD:
        case COMMENT_LIST_ERROR:
            return {
                ...state,
                commentList: null,
                isFetching: false
            };
        default:
            return state;
    }
};