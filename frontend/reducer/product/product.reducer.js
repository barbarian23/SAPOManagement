import {
    START_LOADING_TABLE_DATA,
    STOP_LOADING_TABLE_DATA,
    LOADING_TABLE_DATA,
    GET_LIST_PRODUCTS_SUCCESS,
    GET_LIST_PRODUCTS_FAIL,
    PAGE_CHANGE,
    PAGE_SIZE_CHANGE,
    KEYWORD_CHANGE,
    SEARCH_BUTTON_CLICK,
    STATUS_CHANGE,
    SORT_BY_CHANGE,
    DATE_RANGE_CHANGE,
    SHOW_PRODUCT_POPUP,
    HIDE_PRODUCT_POPUP,
    SHOW_DATE_RANGE_POPUP,
    HIDE_DATE_RANGE_POPUP,
    SKU_SELECT,
    POPUP_KEYWORD_CHANGE,
    GET_LINE_ITEMS_BY_SKU_SUCCESS,
    GET_LINE_ITEMS_BY_SKU_FAIL,
    GET_MACHINES_SUCCESS,
    GET_MACHINES_FAIL,
    POPUP_STATUS_CHANGE,
    POPUP_MACHINE_CHANGE,
    POPUP_PROCESS_TIME_CHANGE,
    START_LOADING_POPUP_TABLE_DATA,
    STOP_LOADING_POPUP_TABLE_DATA,
    LINE_ITEM_SELECT,
} from '../../action/product/product.action';

const initialState = {
    isTableLoading: false,
    listProducts: [],
    total: 0,
    page: 1,
    pageSize: 10,
    keyword: "",
    sortBy: "-confirmed_at",
    status: "",

    isShowDateRangePopup: false,
    startDate: 0,
    endDate: 0,

    isShowProductPopup: false,

    //product popup
    isPopupTableLoading: false,
    lineItems: [],
    machines: [],
    selectedSKU: "",
    selectedLineItemID: "",
    popupKeyword: "",

};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING_TABLE_DATA:
            return {
                ...state,
                isTableLoading: true,
                listProducts: [],
            }
        case STOP_LOADING_TABLE_DATA:
            return {
                ...state,
                isTableLoading: false,
            }
        case GET_LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                listProducts: [...action.value.items],
                total: action.value.total,
                isTableLoading: false,
            }
        case GET_LIST_PRODUCTS_FAIL:
            return {
                ...state,
                listProducts: [],
                total: 0,
                isTableLoading: false,
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
                page: 1,
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
        case SHOW_PRODUCT_POPUP:
            return {
                ...state,
                isShowProductPopup: true
            }
        case HIDE_PRODUCT_POPUP:
            return {
                ...state,
                isShowProductPopup: false
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

        //POPUP
        case START_LOADING_POPUP_TABLE_DATA:
            return {
                ...state,
                isPopupTableLoading: true,
                lineItems: [],
            }
        case STOP_LOADING_POPUP_TABLE_DATA:
            return {
                ...state,
                isPopupTableLoading: false,
            }
        case SKU_SELECT:
            return {
                ...state,
                selectedSKU: action.value
            }
        case LINE_ITEM_SELECT:
            return {
                ...state,
                selectedLineItemID: action.value
            }
        case POPUP_KEYWORD_CHANGE:
            return {
                ...state,
                popupKeyword: action.value
            }
        case GET_LINE_ITEMS_BY_SKU_SUCCESS:
            return {
                ...state,
                lineItems: action.value
            }
        case GET_LINE_ITEMS_BY_SKU_FAIL:
            return {
                ...state,
                lineItems: []
            }
        case GET_MACHINES_SUCCESS:
            return {
                ...state,
                machines: action.value
            }
        case GET_MACHINES_FAIL:
            return {
                ...state,
                machines: []
            }
        case POPUP_STATUS_CHANGE:
            return {
                ...state,
                lineItems: state.lineItems.map((item, index) => {
                    if (index == action.value.index) {
                        return {
                            ...item,
                            status: action.value.status,
                            machine_id: action.value.status == "NOT" ? "" : item.machine_id,
                            process_time: action.value.status == "NOT" ? "" : item.process_time,
                            isEdited: true,
                        };
                    } else {
                        return item;
                    }
                })
            }
        case POPUP_MACHINE_CHANGE:
            return {
                ...state,
                lineItems: state.lineItems.map((item, index) => {
                    if (index == action.value.index) {
                        return {
                            ...item,
                            machine_id: action.value.machine_id,
                            isEdited: true,
                        };
                    } else {
                        return item;
                    }
                })
            }
        case POPUP_PROCESS_TIME_CHANGE:
            return {
                ...state,
                lineItems: state.lineItems.map((item, index) => {
                    if (index == action.value.index) {
                        return {
                            ...item,
                            process_time: action.value.process_time,
                            isEdited: true,
                        };
                    } else {
                        return item;
                    }
                })
            }
        default:
            return {
                ...state
            }
    }
}