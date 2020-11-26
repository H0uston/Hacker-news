import fetchData from "./fetchData";

export const commentsAPI = {
    fetchRootComments: (newsId) => {
        return fetch(fetchData.baseURL + `/comments/${newsId}`);
    },
    fetchNestedComments: (commentId) => {
        return fetch(fetchData.baseURL + `/nestedcomments/${commentId}`);
    },
    fetchComment: (commentId) => {
        return fetch(fetchData.baseURL + `/comment/${commentId}`);
    }
};