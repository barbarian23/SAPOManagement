import {
    GET_LIST_PRODUCTS_SUCCESS,
    GET_LIST_PRODUCTS_FAIL,
    PAGE_CHANGE,
    PAGE_SIZE_CHANGE,
    KEYWORD_CHANGE,
    STATUS_CHANGE,
    SORT_BY_TIME_CHANGE,
    SHOW_PRODUCT_POPUP,
    HIDE_PRODUCT_POPUP,
    SHOW_TIME_RANGE_POPUP,
    HIDE_TIME_RANGE_POPUP,
} from '../../action/product/product.action';

const initialState = {
    something: undefined,
    listProducts: [],
    page: 1,
    pageSize: 10,
    keyword: "",
    sortByTime: "",
    status: "",

    isShowTimeRangePopup: false,
    startTime: 0,
    endTime: 0,

    isShowProductPopup: false,
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                listProducts: [...action.value],
            }
        case GET_LIST_PRODUCTS_FAIL:
            return {
                ...state,
                listProducts: [],
            }
        case PAGE_CHANGE:
            return {
                ...state,
                page: action.value
            }
        case PAGE_SIZE_CHANGE:
            return {
                ...state,
                pageSize: action.value
            }
        case KEYWORD_CHANGE:
            return {
                ...state,
                keyword: action.value
            }
        case STATUS_CHANGE:
            return {
                ...state,
                status: action.value
            }
        case SORT_BY_TIME_CHANGE:
            return {
                ...state,
                sortByTime: action.value
            }

        case SHOW_PRODUCT_POPUP:
            console.log('show')
            return {
                ...state,
                isShowProductPopup: true
            }
        case HIDE_PRODUCT_POPUP:
            return {
                ...state,
                isShowProductPopup: false
            }
        case SHOW_TIME_RANGE_POPUP:
            return {
                ...state,
                isShowTimeRangePopup: true
            }
        case HIDE_TIME_RANGE_POPUP:
            return {
                ...state,
                isShowTimeRangePopup: false
            }
        default:
            return {
                ...state
            }
    }
}