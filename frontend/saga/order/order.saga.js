import { takeLatest, take, put, call, select } from 'redux-saga/effects';
import {
    GET_LIST_ORDERS, 
    GET_LIST_ORDERS_FAIL, 
    GET_LIST_ORDERS_SUCCESS, 
    KEYWORD_CHANGE, 
    PAGE_CHANGE, 
    PAGE_SIZE_CHANGE, 
    SORT_BY_CHANGE, 
    STATUS_CHANGE,
    DATE_RANGE_CHANGE,
} from "../../action/order/order.action";
import { getListOrders } from '../../service/api/order.api';

function* getListOrdersSaga({ value }) {
    const state = yield select((state) => state.order);
    const { keyword, page, pageSize, sortBy, startDate, endDate, status } = state;
    try {
        const response = yield call(getListOrders, page, pageSize, keyword, sortBy, startDate, endDate, status);
        if (response.status === 200) {
            const { code, message, data } =  response.data;
            if (code==200) {
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
}

export const orderSaga = function* () {
    yield takeLatest(GET_LIST_ORDERS, getListOrdersSaga);
    yield takeLatest(STATUS_CHANGE, getListOrdersSaga);
    yield takeLatest(PAGE_CHANGE, getListOrdersSaga);
    yield takeLatest(PAGE_SIZE_CHANGE, getListOrdersSaga);
    yield takeLatest(KEYWORD_CHANGE, getListOrdersSaga);
    yield takeLatest(SORT_BY_CHANGE, getListOrdersSaga);
    yield takeLatest(DATE_RANGE_CHANGE, getListOrdersSaga);
}