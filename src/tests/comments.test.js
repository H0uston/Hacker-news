import commentsReducer from "../state/comments/commentsReducer";
import {
    setCommentIsClosed,
    setCommentIsOpened,
    setComments,
    setNestedComments,
    setUpdatedComments, setUpdatedNestedComments
} from "../state/comments/commentsAction";

let initialState = {
    rootComments: [],
    openedComments: {},
    nestedComments: {},
    updateCommentsTime: 60000,
    loadedCommentIds: [],
};

let createListOfComments = (count, start=0) => {
    let listOfComments = [];
    for (let i = start; i < count + start; i++) {
        listOfComments.push({
            by: `Name${i}`,
            id: i,
            parent: 0,
            text: `<p>Simple text ${i}</p>`,
            time: 241421421,
            type: "comment"
        })
    }

    return listOfComments;
};

let createListOfNestedComments = (count, parentId, start=0) => {
    let listOfNestedComments = {};
    listOfNestedComments[parentId] = createListOfComments(count, start);

    return listOfNestedComments;
};


describe("test setting list of root comments", () => {
    let testNumbers = [0, 1, 5, 10, 15, 100];
    const LOADED_COMMENTS_COUNT = 0;  // no one comment is opened
    const NESTED_COMMENTS_COUNT = 0;  // because no one comment is opened, there are no nested comments

    for (let testNumber of testNumbers) {
        it(`There are ${testNumber} root comments`, () => {
            let newState = commentsReducer(initialState, setComments(createListOfComments(testNumber)));

            expect(newState.rootComments.length).toBe(testNumber);
            expect(Object.keys(newState.openedComments).length).toBe(testNumber);
            expect(Object.keys(newState.nestedComments).length).toBe(LOADED_COMMENTS_COUNT);
            expect(newState.loadedCommentIds.length).toBe(NESTED_COMMENTS_COUNT);
        });
    }
});

describe("test setting list of nested comments", () => {
    let start = 0;
    const ROOTS_COMMENTS_COUNT = 3;
    const OPENED_ROOT_COMMENT = 0;
    const OPENED_ROOT_COMMENT_COUNT = 1;
    const nestedCommentCounts = [0, 1, 5, 10, 15];

    let state = commentsReducer(initialState, setComments(createListOfComments(ROOTS_COMMENTS_COUNT, start)));
    start += ROOTS_COMMENTS_COUNT;
    state = commentsReducer(state, setCommentIsOpened(OPENED_ROOT_COMMENT));

    for (let nestedCommentCount of nestedCommentCounts) {
        let loopState = {...state};
        it(`There are ${nestedCommentCount} nested comments`, () => {
            let newState = commentsReducer(loopState, setNestedComments(createListOfNestedComments(nestedCommentCount,
                OPENED_ROOT_COMMENT, start), OPENED_ROOT_COMMENT));
            start += nestedCommentCount;

            expect(newState.rootComments.length).toBe(ROOTS_COMMENTS_COUNT);
            expect(Object.keys(newState.openedComments).length).toBe(ROOTS_COMMENTS_COUNT + nestedCommentCount);
            expect(Object.keys(newState.nestedComments[OPENED_ROOT_COMMENT]).length).toBe(nestedCommentCount);
            expect(newState.loadedCommentIds.length).toBe(OPENED_ROOT_COMMENT_COUNT);
        });
    }


    state = commentsReducer(state, setCommentIsOpened(OPENED_ROOT_COMMENT + 1));

    for (let nestedCommentCount of nestedCommentCounts) {
        let loopState = {...state};

        it(`There are ${nestedCommentCount} nested comments for two root comments`, () => {
            loopState = commentsReducer(loopState, setNestedComments(createListOfNestedComments(nestedCommentCount, OPENED_ROOT_COMMENT, start), OPENED_ROOT_COMMENT));
            start += nestedCommentCount;
            let newState = commentsReducer(loopState, setNestedComments(createListOfNestedComments(nestedCommentCount, OPENED_ROOT_COMMENT + 1, start), OPENED_ROOT_COMMENT + 1));
            start += nestedCommentCount;

            expect(newState.rootComments.length).toBe(ROOTS_COMMENTS_COUNT);
            expect(Object.keys(newState.openedComments).length).toBe(ROOTS_COMMENTS_COUNT + nestedCommentCount * 2);
            expect(Object.keys(newState.nestedComments[OPENED_ROOT_COMMENT]).length).toBe(nestedCommentCount);
            expect(Object.keys(newState.nestedComments[OPENED_ROOT_COMMENT + 1]).length).toBe(nestedCommentCount);
            expect(newState.loadedCommentIds.length).toBe(OPENED_ROOT_COMMENT_COUNT + 1);
        });
    }
});

describe("Test with opening comments", () => {
    let start = 0;
    const ROOT_COMMENTS_COUNT = 1;
    const NESTED_COMMENTS_COUNT = 5;

    let rootComments = createListOfComments(ROOT_COMMENTS_COUNT);
    start += 1;
    let state = commentsReducer(initialState, setComments(rootComments));

    it("open root comment", () => {
        expect(state.openedComments[rootComments[ROOT_COMMENTS_COUNT - 1].id]).toBe(false);

        let newState = commentsReducer(state, setCommentIsOpened(rootComments[ROOT_COMMENTS_COUNT - 1].id));

        expect(newState.openedComments[rootComments[ROOT_COMMENTS_COUNT - 1].id]).toBe(true);
    });

    it("open nested comment", () => {
        state = commentsReducer(state,
            setNestedComments(createListOfNestedComments(NESTED_COMMENTS_COUNT, rootComments[ROOT_COMMENTS_COUNT - 1].id, start), rootComments[0].id));
        start += NESTED_COMMENTS_COUNT;

        expect(state.openedComments[start - 1]).toBe(false);

        let newState = commentsReducer(state, setCommentIsOpened(start - 1));

        expect(newState.openedComments[start - 1]).toBe(true);
    });

    it("open nested comment of nested comment", () => {
        state = commentsReducer(state,
            setNestedComments(createListOfNestedComments(NESTED_COMMENTS_COUNT, state.nestedComments[rootComments[0].id], start), state.nestedComments[rootComments[0].id]));
        start += NESTED_COMMENTS_COUNT;

        expect(Object.keys(state.nestedComments).length).toBe(2);

        let newState = commentsReducer(state, setCommentIsOpened(start - 1));

        expect(newState.openedComments[start - 1]).toBe(true);
    });

    it("try to open nonexistent comment", () => {
        state = commentsReducer(state, setCommentIsOpened(1000));
        expect(state.openedComments[1000]).toBe(undefined);
    })
});

describe("Test with closing comments", () => {
    const NESTED_COMMENTS_COUNT = 5;
    const ROOT_COMMENTS_COUNT = 1;

    let start = 0;
    let rootComments = createListOfComments(ROOT_COMMENTS_COUNT, start);
    start += ROOT_COMMENTS_COUNT;
    let state = commentsReducer(initialState, setComments(rootComments));

    it("close root comment", () => {
        expect(state.openedComments[rootComments[ROOT_COMMENTS_COUNT - 1].id]).toBe(false);

        let newState = commentsReducer(state, setCommentIsOpened(rootComments[ROOT_COMMENTS_COUNT - 1].id));

        expect(newState.openedComments[rootComments[ROOT_COMMENTS_COUNT - 1].id]).toBe(true);

        newState = commentsReducer(state, setCommentIsClosed(rootComments[ROOT_COMMENTS_COUNT - 1].id));

        expect(newState.openedComments[rootComments[ROOT_COMMENTS_COUNT - 1].id]).toBe(false);
    });

    it("close nested comment", () => {
        state = commentsReducer(state,
            setNestedComments(createListOfNestedComments(NESTED_COMMENTS_COUNT, rootComments[ROOT_COMMENTS_COUNT - 1].id, start), rootComments[ROOT_COMMENTS_COUNT - 1].id));
        start += NESTED_COMMENTS_COUNT;
        expect(state.openedComments[start - 1]).toBe(false);

        let newState = commentsReducer(state, setCommentIsOpened(start - 1));

        expect(newState.openedComments[start - 1]).toBe(true);

        newState = commentsReducer(state, setCommentIsClosed(start - 1));

        expect(newState.openedComments[start - 1]).toBe(false);
    });

    it("close nonexistent comment", () => {
        state = commentsReducer(state, setCommentIsClosed(1000));
        expect(state.openedComments[1000]).toBe(undefined);
    });
});

describe("Test with updating root comments", () => {
    let start = 1000;
    const ROOT_COMMENT_COUNT = 4;
    const UPDATED_ROOT_COMMENT_COUNT = 5;
    const NESTED_COUNT = 5;
    let state = commentsReducer(initialState, setComments(createListOfComments(ROOT_COMMENT_COUNT, start)));
    start += ROOT_COMMENT_COUNT;

    it("test update with only roots", () => {
        let newState = commentsReducer(state, setUpdatedComments([...state.rootComments, ...createListOfComments(UPDATED_ROOT_COMMENT_COUNT, start)]));
        start += UPDATED_ROOT_COMMENT_COUNT;

        expect(newState.rootComments.length).toBe(ROOT_COMMENT_COUNT + UPDATED_ROOT_COMMENT_COUNT);
        expect(Object.keys(newState.openedComments).length).toBe(ROOT_COMMENT_COUNT + UPDATED_ROOT_COMMENT_COUNT);
        expect(Object.keys(newState.nestedComments).length).toBe(0);
        expect(newState.loadedCommentIds.length).toBe(0);
    });

    it("test update with nested roots", () => {
        state = commentsReducer(state, setCommentIsOpened(ROOT_COMMENT_COUNT - 1));
        state = commentsReducer(state, setNestedComments(createListOfNestedComments(NESTED_COUNT, ROOT_COMMENT_COUNT - 1, start)));
        start += NESTED_COUNT;
        let newState = commentsReducer(state, setUpdatedComments([...state.rootComments, ...createListOfComments(UPDATED_ROOT_COMMENT_COUNT, start)]));
        start += UPDATED_ROOT_COMMENT_COUNT;

        expect(newState.rootComments.length).toBe(ROOT_COMMENT_COUNT + UPDATED_ROOT_COMMENT_COUNT);
        expect(Object.keys(newState.openedComments).length).toBe(ROOT_COMMENT_COUNT + NESTED_COUNT + UPDATED_ROOT_COMMENT_COUNT);
        expect(Object.keys(newState.nestedComments).length).toBe(1);
        expect(newState.loadedCommentIds.length).toBe(1);
    });
});

describe("Test with updating nested comments", () => {
    let start = 0;
    const ROOT_COMMENTS_COUNT = 4;
    const NESTED_COMMENTS_COUNT = 10;
    const UPDATED_NESTED_COMMENTS_COUNT = 11;
    let state = commentsReducer(initialState, setComments(createListOfComments(ROOT_COMMENTS_COUNT, start)));
    start += ROOT_COMMENTS_COUNT;

    it("test update nested comments with one opened roots", () => {
        state = commentsReducer(state, setCommentIsOpened(ROOT_COMMENTS_COUNT - 1));
        state = commentsReducer(state, setNestedComments(createListOfNestedComments(NESTED_COMMENTS_COUNT, ROOT_COMMENTS_COUNT - 1, start)));
        start += NESTED_COMMENTS_COUNT;

        let newState = commentsReducer(state,
            setUpdatedNestedComments(createListOfNestedComments(UPDATED_NESTED_COMMENTS_COUNT, ROOT_COMMENTS_COUNT - 1, start - NESTED_COMMENTS_COUNT), ROOT_COMMENTS_COUNT - 1));
        start += UPDATED_NESTED_COMMENTS_COUNT;

        expect(newState.rootComments.length).toBe(ROOT_COMMENTS_COUNT);
        expect(Object.keys(newState.openedComments).length).toBe(ROOT_COMMENTS_COUNT + UPDATED_NESTED_COMMENTS_COUNT);
        expect(Object.keys(newState.nestedComments).length).toBe(1);
        expect(Object.keys(newState.nestedComments[ROOT_COMMENTS_COUNT - 1]).length).toBe(UPDATED_NESTED_COMMENTS_COUNT);
        expect(newState.loadedCommentIds.length).toBe(1);
    });

    it("test update nested comments with two opened roots", () => {
        state = commentsReducer(state, setCommentIsOpened(ROOT_COMMENTS_COUNT - 2));
        state = commentsReducer(state, setNestedComments(createListOfNestedComments(NESTED_COMMENTS_COUNT, ROOT_COMMENTS_COUNT - 2, start)));
        start += NESTED_COMMENTS_COUNT;

        let newState = commentsReducer(state,
            setUpdatedNestedComments(createListOfNestedComments(UPDATED_NESTED_COMMENTS_COUNT, ROOT_COMMENTS_COUNT - 2, start - NESTED_COMMENTS_COUNT), ROOT_COMMENTS_COUNT - 2));
        start += UPDATED_NESTED_COMMENTS_COUNT;

        expect(newState.rootComments.length).toBe(ROOT_COMMENTS_COUNT);
        expect(Object.keys(newState.openedComments).length).toBe(ROOT_COMMENTS_COUNT + NESTED_COMMENTS_COUNT + UPDATED_NESTED_COMMENTS_COUNT);
        expect(Object.keys(newState.nestedComments).length).toBe(2);
        expect(newState.loadedCommentIds.length).toBe(2);
    });
});
