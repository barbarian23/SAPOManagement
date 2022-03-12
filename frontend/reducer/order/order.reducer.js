import {
    GET_LIST_ORDERS_SUCCESS,
    GET_LIST_ORDERS_FAIL,
    PAGE_CHANGE,
    PAGE_SIZE_CHANGE,
    KEYWORD_CHANGE,
    STATUS_CHANGE,
    SORT_BY_CHANGE,
    DATE_RANGE_CHANGE,
    SHOW_DATE_RANGE_POPUP,
    HIDE_DATE_RANGE_POPUP,
} from '../../action/order/order.action';

const initialState = {
    listOrders: [],
    total: 0,
    page: 1,
    pageSize: 10,
    keyword: "",
    sortBy: "",
    status: "",

    isShowDateRangePopup: false,
    startDate: 0,
    endDate: 0,
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIST_ORDERS_SUCCESS:
            return {
                ...state,
                listOrders: [...action.value.items],
                total: action.value.total,
            }
        case GET_LIST_ORDERS_FAIL:
            return {
                ...state,
                listOrders: [],
                total: 0
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
        case SORT_BY_CHANGE:
            return {
                ...state,
                sortBy: action.value
            }
        case DATE_RANGE_CHANGE:
            return {
                ...state,
                startDate: action.value.startDate,
                endDate: action.value.endDate,
            }
        case SHOW_DATE_RANGE_POPUP:
            return {
                ...state,
                isShowDateRangePopup: true
            }
        case HIDE_DATE_RANGE_POPUP:
            return {
                ...state,
                isShowDateRangePopup: false
            }
        default:
            return {
                ...state
            }
    }
}