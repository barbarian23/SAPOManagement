import { takeLatest, take, put, call, select } from 'redux-saga/effects';
import { GET_LIST_PRODUCTS, GET_LIST_PRODUCTS_FAIL, GET_LIST_PRODUCTS_SUCCESS } from "../../action/product/product.action";
import { getListProducts } from '../../service/api/product.api';

function* getListProductsSaga({ payload }) {
    const state = yield select((state) => state.product);
    const { keyword, page, pageSize, sortByTime, status } = state;
    try {
        const response = yield call(getListProducts, keyword, page, pageSize, sortByTime, status);
        if (response.status === 200) {
            const { code, message, data } =  response.data;
            if (code==200) {
                console.log(message);
                yield put({
                    type: GET_LIST_PRODUCTS_SUCCESS,
                    value: []
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
}

export const productSaga = function* () {
    yield takeLatest(GET_LIST_PRODUCTS, getListProductsSaga);
}