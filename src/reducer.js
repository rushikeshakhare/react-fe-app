import {
    FETCH_CANDIDATES,
    FETCH_CANDIDATES_SUCCESS,
    FETCH_CANDIDATES_ERROR,
    SEARCH_CANDIDATES_BY_QUERY,
    UPDATE_CANDIDATES
} from './types'

export const initialState = {
    loading: false,
    candidates: [],
    error: null,
    allCandidates: [],
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case FETCH_CANDIDATES: {
            return {
                ...state,
                loading: true,
                candidates: [],
            };
        }
        case FETCH_CANDIDATES_SUCCESS: {
            const modCandidates = action.response.map((candidate) => ({
                ...candidate,
                shortlisted: false,
                rejected: false,
            }));
            return {
                ...state,
                loading: false,
                candidates: modCandidates,
                allCandidates: modCandidates,
            };
        }
        case FETCH_CANDIDATES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case SEARCH_CANDIDATES_BY_QUERY: {
            return {
                ...state,
                loading: false,
                candidates: action.response,
            };
        }
        case UPDATE_CANDIDATES: {
            return {
                ...state,
                loading: false,
                candidates: action.response,
                allCandidates: action.response,
            };
        }
        default: {
            return state;
        }
    }
};