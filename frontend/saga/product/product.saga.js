import { takeLatest, take, put, call, select } from 'redux-saga/effects';
import { 
    GET_LINE_ITEMS_BY_SKU_FAIL,
    GET_LINE_ITEMS_BY_SKU_SUCCESS,
    GET_MACHINES,
    GET_MACHINES_SUCCESS,
    GET_MACHINES_FAIL,
    GET_LIST_PRODUCTS, 
    GET_LIST_PRODUCTS_FAIL, 
    GET_LIST_PRODUCTS_SUCCESS, 
    KEYWORD_CHANGE, 
    PAGE_CHANGE, 
    PAGE_SIZE_CHANGE, 
    SKU_SELECT, 
    SORT_BY_CHANGE, 
    STATUS_CHANGE,
    DATE_RANGE_CHANGE,
    UPDATE_LINE_ITEM_STATUS,
    UPDATE_LINE_ITEM_STATUS_FAIL,
    UPDATE_LINE_ITEM_STATUS_SUCCESS,
    POPUP_KEYWORD_CHANGE,
    START_LOADING_TABLE_DATA,
    STOP_LOADING_TABLE_DATA,
    SEARCH_BUTTON_CLICK,
} from "../../action/product/product.action";
import { getListProducts, getLineItemsBySKU } from '../../service/api/product.api';
import { getMachines } from '../../service/api/machine.api';
import { updateStatus } from '../../service/api/lineItem.api';

function* getListProductsSaga({ value }) {
    const state = yield select((state) => state.product);
    const { keyword, page, pageSize, sortBy, startDate, endDate, status } = state;

    yield put({type: START_LOADING_TABLE_DATA});
    try {
        const response = yield call(getListProducts, page, pageSize, keyword, sortBy, startDate, endDate, status);
        if (response.status === 200) {
            const { code, message, data } =  response.data;
            if (code==200) {
                console.log(message);
                yield put({
                    type: GET_LIST_PRODUCTS_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
                yield put({
                    type: GET_LIST_PRODUCTS_FAIL,
                    value: []
                });
            }
        } else {
            console.log('API error');
            yield put({
                type: GET_LIST_PRODUCTS_FAIL,
                value: []
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: GET_LIST_PRODUCTS_FAIL,
            value: error
        });
    }

    yield put({type: STOP_LOADING_TABLE_DATA});
}

function* getLineItemsSaga({ value }) {
    const state = yield select((state) => state.product);
    const { selectedSKU, popupKeyword } = state;
    try {
        const response = yield call(getLineItemsBySKU, selectedSKU, popupKeyword);
        if (response.status === 200) {
            const { code, message, data } =  response.data;
            if (code==200) {
                console.log(message);
                yield put({
                    type: GET_LINE_ITEMS_BY_SKU_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
                yield put({
                    type: GET_LINE_ITEMS_BY_SKU_FAIL,
                    value: []
                });
            }
        } else {
            console.log('API error');
            yield put({
                type: GET_LINE_ITEMS_BY_SKU_FAIL,
                value: []
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: GET_LINE_ITEMS_BY_SKU_FAIL,
            value: error
        });
    }
}

function* getMachinesSaga({ value }) {
    try {
        const response = yield call(getMachines);
        if (response.status === 200) {
            const { code, message, data } = response.data;
            if (code==200) {
                console.log(message);
                yield put({
                    type: GET_MACHINES_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
                yield put({
                    type: GET_MACHINES_FAIL,
                    value: []
                });
            }
        } else {
            console.log('API error');
            yield put({
                type: GET_MACHINES_FAIL,
                value: []
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: GET_MACHINES_FAIL,
            value: error
        });
    }
}

function* updateLineItemStatusSaga({ value }) {
    try {
        console.log(value)
        let {id, status, machine_id} = value;
        const response = yield call(updateStatus, id, status, machine_id);
        if (response.status === 200) {
            const { code, message, data } = response.data;
            if (code==200) {
                console.log(message);
                yield put({
                    type: UPDATE_LINE_ITEM_STATUS_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
                yield put({
                    type: UPDATE_LINE_ITEM_STATUS_FAIL,
                    value: []
                });
            }
        } else {
            console.log('API error');
            yield put({
                type: UPDATE_LINE_ITEM_STATUS_FAIL,
                value: []
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: UPDATE_LINE_ITEM_STATUS_FAIL,
            value: error
        });
    }
}

export const productSaga = function* () {
    yield takeLatest(GET_LIST_PRODUCTS, getListProductsSaga);
    yield takeLatest(STATUS_CHANGE, getListProductsSaga);
    yield takeLatest(PAGE_CHANGE, getListProductsSaga);
    yield takeLatest(PAGE_SIZE_CHANGE, getListProductsSaga);
    yield takeLatest(SORT_BY_CHANGE, getListProductsSaga);
    yield takeLatest(DATE_RANGE_CHANGE, getListProductsSaga);
    yield takeLatest(SEARCH_BUTTON_CLICK, getListProductsSaga);
    // yield takeLatest(KEYWORD_CHANGE, getListProductsSaga);

    yield takeLatest(GET_MACHINES, getMachinesSaga);
    yield takeLatest(SKU_SELECT, getLineItemsSaga);
    yield takeLatest(POPUP_KEYWORD_CHANGE, getLineItemsSaga);
    
    yield takeLatest(UPDATE_LINE_ITEM_STATUS, updateLineItemStatusSaga);
    yield takeLatest(UPDATE_LINE_ITEM_STATUS_SUCCESS, getListProductsSaga);
}