import fetchData from "./fetchData";

export const commentsAPI = {
    fetchCommentData: (commentId) => {
        return fetch(fetchData.baseURL + `item/${commentId}.json?print=pretty`);
    },
};