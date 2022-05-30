import { takeLatest, take, put, call, select } from 'redux-saga/effects';
import {
    GET_LIST_ORDERS,
    GET_LIST_ORDERS_FAIL,
    GET_LIST_ORDERS_SUCCESS,
    START_LOADING_TABLE_DATA,
    STOP_LOADING_TABLE_DATA,
    SEARCH_BUTTON_CLICK,
    PAGE_CHANGE,
    PAGE_SIZE_CHANGE,
    SORT_BY_CHANGE,
    STATUS_CHANGE,
    DATE_RANGE_CHANGE,
    GET_FULFILLMENT_DETAIL,
    GET_FULFILLMENT_DETAIL_SUCCESS,
    GET_FULFILLMENT_DETAIL_FAIL,
    START_LOADING_POPUP_TABLE_DATA,
    STOP_LOADING_POPUP_TABLE_DATA,
    SET_IS_PRINTED,
    SET_IS_PRINTED_SUCCESS,
    SET_STATUS_SUCCESS,
    SET_STATUS,
} from "../../action/order/order.action";
import { getListOrders, setPrinted, setStatus } from '../../service/api/order.api';
import { getDetailByID } from '../../service/api/fulfillment.api';

function* getListOrdersSaga({ value }) {
    const state = yield select((state) => state.order);
    const { keyword, page, pageSize, sortBy, startDate, endDate, status } = state;
    yield put({ type: START_LOADING_TABLE_DATA });
    try {
        const response = yield call(getListOrders, page, pageSize, keyword, sortBy, startDate, endDate, status);
        if (response.status === 200) {
            const { code, message, data } = response.data;
            if (code == 200) {
                console.log(message);
                yield put({
                    type: GET_LIST_ORDERS_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
                yield put({
                    type: GET_LIST_ORDERS_FAIL,
                    value: []
                });
            }
        } else {
            console.log('API error');
            yield put({
                type: GET_LIST_ORDERS_FAIL,
                value: []
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: GET_LIST_ORDERS_FAIL,
            value: error
        });
    }
    yield put({ type: STOP_LOADING_TABLE_DATA });
}

function* setPrintedSaga({ value }) {
    console.log(value);
    const { isPrinted, orderNumber } = value;
    try {
        const response = yield call(setPrinted, isPrinted, orderNumber);
        if (response.status === 200) {
            const { code, message, data } = response.data;
            if (code == 200) {
                console.log(message);
                yield put({
                    type: SET_IS_PRINTED_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
            }
        } else {
            console.log('API error');
        }
    } catch (error) {
        console.log(error);
    }
}

function* setStatusSaga({ value }) {
    console.log(value);
    const { status, orderNumber } = value;
    try {
        const response = yield call(setStatus, status, orderNumber);
        if (response.status === 200) {
            const { code, message, data } = response.data;
            if (code == 200) {
                console.log(message);
                yield put({
                    type: SET_STATUS_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
            }
        } else {
            console.log('API error');
        }
    } catch (error) {
        console.log(error);
    }
}

function* getFulfillmentDetail({ value }) {
    const state = yield select((state) => state.order);
    const { selectedFulfillmentID } = state;
    yield put({ type: START_LOADING_POPUP_TABLE_DATA });
    try {
        const response = yield call(getDetailByID, selectedFulfillmentID);
        if (response.status === 200) {
            const { code, message, data } = response.data;
            if (code == 200) {
                console.log(message);
                yield put({
                    type: GET_FULFILLMENT_DETAIL_SUCCESS,
                    value: data
                });
            } else {
                console.log(message);
                yield put({
                    type: GET_FULFILLMENT_DETAIL_FAIL,
                    value: []
                });
            }
        } else {
            console.log('API error');
            yield put({
                type: GET_FULFILLMENT_DETAIL_FAIL,
                value: []
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: GET_FULFILLMENT_DETAIL_FAIL,
            value: error
        });
    }
    yield put({ type: STOP_LOADING_POPUP_TABLE_DATA });
}

export const orderSaga = function* () {
    yield takeLatest(GET_LIST_ORDERS, getListOrdersSaga);
    yield takeLatest(STATUS_CHANGE, getListOrdersSaga);
    yield takeLatest(PAGE_CHANGE, getListOrdersSaga);
    yield takeLatest(PAGE_SIZE_CHANGE, getListOrdersSaga);
    yield takeLatest(SORT_BY_CHANGE, getListOrdersSaga);
    yield takeLatest(DATE_RANGE_CHANGE, getListOrdersSaga);
    yield takeLatest(SEARCH_BUTTON_CLICK, getListOrdersSaga);
    // yield takeLatest(KEYWORD_CHANGE, getListOrdersSaga);

    yield takeLatest(SET_IS_PRINTED, setPrintedSaga);
    yield takeLatest(SET_IS_PRINTED_SUCCESS, getListOrdersSaga);
    yield takeLatest(SET_STATUS, setStatusSaga);
    yield takeLatest(SET_STATUS_SUCCESS, getListOrdersSaga);

    yield takeLatest(GET_FULFILLMENT_DETAIL, getFulfillmentDetail);
}