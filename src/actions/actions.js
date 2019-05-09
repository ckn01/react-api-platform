import { requests } from "../agent";
import { BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_ERROR, BLOG_POST_LIST_RECEIVED, BLOG_POST_LIST_ADD,
        BLOG_POST_REQUEST, BLOG_POST_ERROR, BLOG_POST_RECEIVED, BLOG_POST_UNLOAD,
        COMMENT_LIST_REQUEST, COMMENT_LIST_ERROR, COMMENT_LIST_RECEIVED, COMMENT_LIST_ADD, COMMENT_LIST_UNLOAD, 
        USER_LOGIN_SUCCESS, USER_LOGOUT,
        USER_PROFILE_REQUEST,
        USER_PROFILE_ERROR,
        USER_PROFILE_RECEIVED,
        USER_SET_ID,
        COMMENT_ADDED,
        BLOG_POST_LIST_SET_PAGE,
        USER_REGISTER_SUCCESS,
        USER_CONFIRMATION_SUCCESS,
        USER_REGISTER_COMPLETE,
        IMAGE_UPLOADED,
        IMAGE_UPLOAD_REQUEST,
        IMAGE_UPLOAD_ERROR} from "./constants";
import { SubmissionError } from 'redux-form';
import { parseApiErrors } from "../apiUtils";

export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
});

export const blogPostListError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error
});

export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data
});

export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostListRequest());
        return requests.get(`/blog_posts?_page=${page}`)
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostListError(error)));
    }
};

export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page
});

export const blogPostListAdd = () => ({
    type: BLOG_POST_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'A newly added blog post'
    }
});

export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST,
});

export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    error
});

export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data
});

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD
});

export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostRequest());
        return requests.get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};

export const blogPostAdd = (posts) => (dispatch => requests.post(
    '/blog_posts',
    {
        ...posts,
        slug: posts.title && posts.title.replace(/ /g, '-').toLowerCase()
    }
).catch(error => {
    if (401 === error.response.status) {
        return dispatch(userLogout());
    } else if (403 === error.response.status) {
        throw new SubmissionError({
            _error: 'You do not have rights to publish blog posts!'
        });
    }
    throw new SubmissionError(parseApiErrors(error));
}));

export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,
});

export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error
});

export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data
});

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD
});

export const commentListFetch = (id, page = 1) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests.get(`/blog_posts/${id}/comments?_page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const commentListAdd = () => ({
    type: COMMENT_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'A newly added blog post'
    }
});

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});

export const commentAdd = (comment, blogPostId) => (dispatch => requests.post(
    '/comments',
    {
        content: comment,
        blogPost: `/api/blog_posts/${blogPostId}`
    }
).then(
    response => dispatch(commentAdded(response))
).catch(error => {
    if (401 === error.response.status) {
        return dispatch(userLogout());
    }
    throw new SubmissionError(parseApiErrors(error));
}));

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', {username, password}, false).then(
            response => dispatch(userLoginSuccess(response.token, response.id))
        ).catch(() => {
            throw new SubmissionError({
                _error: 'Username or password is invalid'
            });
        })
    };
};

// export const userRegister = (username, password, retypedPassword, email, name) => {
//     return (dispatch) => {
//         return requests.post('/users', {username, password, retypedPassword, email, name}, false)
//             .catch(error => {
//                 throw new SubmissionError(parseApiErrors(error));
//             });
//     };
// };

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    };
};

export const userRegister = (values) => {
    return (dispatch) => {
        return requests.post('/users', values, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error));
            });
    };
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    };
};

export const userConfirm = (values) => {
    return (dispatch) => {
        return requests.post('/users/confirm', values, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(() => {
                throw new SubmissionError({
                    _error: 'Confirmation token is invalid'
                });
            });
    };
};

export const UserRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    };
};

export const userSetId = (userId) => ({
    type: USER_SET_ID,
    userId
});

export const userLogout = () => ({
    type: USER_LOGOUT
});

export const userLoginSuccess = (token, userId) => ({
    type: USER_LOGIN_SUCCESS,
    token,
    userId
});

export const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST
});

export const userProfileError = (userId) => ({
    type: USER_PROFILE_ERROR,
    userId
});

export const userProfileReceived = (userId, userData) => ({
    type: USER_PROFILE_RECEIVED,
    userId,
    userData
});

export const userProfileFetch = userId => (
    dispatch => {
        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId, response))
        ).catch(() => dispatch(userProfileError(userId)));
    }
);

export const imageUploaded = (data) => ({
    type: IMAGE_UPLOADED,
    image: data
});

export const imageUploadRequest = () => ({
    type: IMAGE_UPLOAD_REQUEST
});

export const imageUploadError = () => ({
    type: IMAGE_UPLOAD_ERROR
});

export const imageUpload = (file) => {
    return (dispatch) => {
        dispatch(imageUploadRequest());
        return requests.upload('/images', file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(() => dispatch(imageUploadError))
    }
};