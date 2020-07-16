import { apiUrl, allLanguage } from './Common';
import { FilterBranch } from './FilterBranch';

const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
const QUERY_PLACEHOLDER_STRING = 'QUERY_PLACEHOLDER_STRING';
const QUERY_STRING = 'QUERY_STRING';
const RESET_DATA = 'RESET_DATA';
const DELETE_ITEM = 'DELETE_ITEM';
const FILTER_ALL = 'FILTER_ALL';

export function fetchRepoData() {
    return (dispatch, getState) => {
        const qry = getQuery(getState());

        dispatch({ type: FETCH_DATA_BEGIN });

        Promise.all([
            fetch(apiUrl + qry)
                .then((response) => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.statusText);
                })
                .then((response) => response.json()),
            fetch(apiUrl + qry + '/repos')
                .then((response) => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.statusText);
                })
                .then((response) => response.json()),
        ])
            .then(([dataObject, dataObjectRepos]) => {
                dispatch({
                    type: FETCH_DATA_SUCCESS,
                    payload: { dataObject, dataObjectRepos },
                });
                dispatch({
                    type: QUERY_PLACEHOLDER_STRING,
                    payload: { query: '', placeholder: '' },
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_DATA_ERROR,
                    payload: { error },
                });
            });
    };
}

function getQuery(state) {
    return state.query;
}

function getSearch(state) {
    return state.search;
}

function getLanguage(state) {
    return state.language;
}

function getFilterBranch(state) {
    return state.filterBranch;
}

export function queryChange(query) {
    return (dispatch) => {
        dispatch({ type: QUERY_STRING, query });
    };
}

export function resetData() {
    return (dispatch) => {
        dispatch({ type: RESET_DATA });
    };
}

export function deleteItem(id) {
    return (dispatch) => {
        dispatch({ type: DELETE_ITEM, id });
    };
}

export function searchItem(text) {
    return (dispatch, getState) => {
        dispatch({
            type: FILTER_ALL,
            payload: {
                search: text,
                language: getLanguage(getState()),
                filterBranch: getFilterBranch(getState()),
            },
        });
    };
}

export function filterLanguage(text) {
    return (dispatch, getState) => {
        dispatch({
            type: FILTER_ALL,
            payload: {
                search: getSearch(getState()),
                language: text,
                filterBranch: getFilterBranch(getState()),
            },
        });
    };
}

export function filterBranch(filter) {
    return (dispatch, getState) => {
        dispatch({
            type: FILTER_ALL,
            payload: {
                search: getSearch(getState()),
                language: getLanguage(getState()),
                filterBranch: filter,
            },
        });
    };
}

function getDataSearch(data, search) {
    return search.length > 0
        ? data.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
          )
        : data;
}

function getDataLanguage(data, language) {
    return language !== allLanguage
        ? data.filter((item) => item.language === language)
        : data;
}

function getDataFilterBranch(data, filter) {
    switch (filter) {
        case FilterBranch.ALL:
            return data;
        case FilterBranch.MASTER:
            return data.filter(
                (item) =>
                    item.default_branch.toLowerCase() ===
                    FilterBranch.MASTER.toLowerCase()
            );
        case FilterBranch.OTHER:
            return data.filter(
                (item) =>
                    item.default_branch.toLowerCase() !==
                    FilterBranch.MASTER.toLowerCase()
            );
        case FilterBranch.NONE:
            return [];
        default:
            return [];
    }
}

const initialState = {
    query: '',
    placeholder: 'e.g. facebook',
    result: {},
    resultRepos: [],
    resultReposFiltered: [],
    isLoading: false,
    hasError: false,
    errorMsg: '',
    search: '',
    language: allLanguage,
    filterBranch: FilterBranch.ALL,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_BEGIN:
            return {
                ...state,
                isLoading: true,
                hasError: false,
                errorMsg: '',
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                result: action.payload.dataObject,
                resultRepos: action.payload.dataObjectRepos,
                resultReposFiltered: action.payload.dataObjectRepos,
                hasError: false,
                errorMsg: '',
                search: '',
                language: allLanguage,
                filterBranch: FilterBranch.ALL,
            };
        case FETCH_DATA_ERROR:
            return {
                ...state,
                result: {},
                resultRepos: [],
                resultReposFiltered: [],
                isLoading: false,
                hasError: true,
                errorMsg: action.payload.error.message,
                search: '',
                language: allLanguage,
                filterBranch: FilterBranch.ALL,
            };

        case QUERY_PLACEHOLDER_STRING:
            return {
                ...state,
                query: action.payload.query,
                placeholder: action.payload.placeholder,
            };

        case QUERY_STRING:
            return {
                ...state,
                query: action.query,
            };

        case RESET_DATA: {
            return {
                ...state,
                query: '',
                placeholder: 'e.g. facebook',
                result: {},
                resultRepos: [],
                resultReposFiltered: [],
                isLoading: false,
                hasError: false,
                errorMsg: '',
                search: '',
                language: allLanguage,
                filterBranch: FilterBranch.ALL,
            };
        }

        case DELETE_ITEM:
            return {
                ...state,
                resultRepos: state.resultRepos.filter(
                    (item) => item.id !== action.id
                ),
                resultReposFiltered: state.resultReposFiltered.filter(
                    (item) => item.id !== action.id
                ),
            };

        case FILTER_ALL: {
            return {
                ...state,
                search: action.payload.search,
                language: action.payload.language,
                filterBranch: action.payload.filterBranch,
                resultReposFiltered: getDataFilterBranch(
                    getDataLanguage(
                        getDataSearch(
                            [...state.resultRepos],
                            action.payload.search
                        ),
                        action.payload.language
                    ),
                    action.payload.filterBranch
                ),
            };
        }

        default:
            return state;
    }
}
