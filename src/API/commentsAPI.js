import fetchData from "./fetchData";

export const commentsAPI = {
    getCommentData: (commentId) => {
        return fetch(fetchData.baseURL + `item/${commentId}.json?print=pretty`);
    },
};