import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:8000/api';
const responseBody = resopnse => resopnse.body;

let token = null;

const tokenPlugin = (request) => {
    request.set('Authorization', `Bearer ${token}`);
};

export const requests = {
    get: (url) =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body = null) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    setToken: (newJwtToken) => token = newJwtToken
};