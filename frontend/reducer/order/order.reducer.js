import {
    START_LOADING_TABLE_DATA,
    STOP_LOADING_TABLE_DATA,
    GET_LIST_ORDERS_SUCCESS,
    GET_LIST_ORDERS_FAIL,
    PAGE_CHANGE,
    PAGE_SIZE_CHANGE,
    KEYWORD_CHANGE,
    SEARCH_BUTTON_CLICK,
    STATUS_CHANGE,
    SORT_BY_CHANGE,
    DATE_RANGE_CHANGE,
    SHOW_ORDER_POPUP,
    HIDE_ORDER_POPUP,
    SHOW_DATE_RANGE_POPUP,
    HIDE_DATE_RANGE_POPUP,
    SELECT_FULFILLMENT,
    START_LOADING_POPUP_TABLE_DATA,
    STOP_LOADING_POPUP_TABLE_DATA,
    GET_FULFILLMENT_DETAIL_SUCCESS,
    GET_FULFILLMENT_DETAIL_FAIL,
    SET_IS_PRINTED_SUCCESS,
} from '../../action/order/order.action';

const initialState = {
    isTableLoading: false,
    listOrders: [],
    total: 0,
    page: 1,
    pageSize: 10,
    keyword: "",
    sortBy: "-created_at",
    status: "",

    isShowOrderPopup: false,
    isShowDateRangePopup: false,
    startDate: 0,
    endDate: 0,

    //popup
    isPopupTableLoading: false,
    selectedFulfillmentID: 0,
    fulfillment: {
        id: 0,
        status: "",
        real_shipping_fee: 0,
        first_name: "",
        last_name: "",
        customer: {
            default_address:{
                address1: '',
                ward: '',
                district: '',
                province: '',
            }
        },
        shipping_address: "",
        shipping_phone: "",
        order_number: "",
        source_name: "",
        quantity: 0,
        total_quantity: 0,
        lineitems: [],
    },
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING_TABLE_DATA:
            return {
                ...state,
                isTableLoading: true,
                listOrders: [],
            }
        case STOP_LOADING_TABLE_DATA:
            return {
                ...state,
                isTableLoading: false,
            }
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
        case SEARCH_BUTTON_CLICK:
            return {
                ...state,
                page: 1
            }
        case STATUS_CHANGE:
            return {
                ...state,
                status: action.value,
                page: 1,
            }
        case SORT_BY_CHANGE:
            return {
                ...state,
                sortBy: action.value,
                page: 1,
            }
        case DATE_RANGE_CHANGE:
            return {
                ...state,
                startDate: action.value.startDate,
                endDate: action.value.endDate,
                page: 1,
            }
        
        //POPUP
        case SHOW_ORDER_POPUP:
            return {
                ...state,
                isShowOrderPopup: true
            }
        case HIDE_ORDER_POPUP:
            return {
                ...state,
                isShowOrderPopup: false
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
        case SELECT_FULFILLMENT:
            return {
                ...state,
                selectedFulfillmentID: action.value
            }
        case START_LOADING_POPUP_TABLE_DATA:
            return {
                ...state,
                isPopupTableLoading: true,
            }
        case STOP_LOADING_POPUP_TABLE_DATA:
            return {
                ...state,
                isPopupTableLoading: false,
            }

        case GET_FULFILLMENT_DETAIL_SUCCESS:
            return {
                ...state,
                fulfillment: action.value,
            }
        case GET_FULFILLMENT_DETAIL_FAIL:
            return {
                ...state,
                fulfillment: initialState.fulfillment,
            }
        default:
            return {
                ...state
            }
    }
}