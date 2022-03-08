import { takeLatest, take, put, call, select } from 'redux-saga/effects';
import { 
    GET_LIST_PRODUCTS, 
    GET_LIST_PRODUCTS_FAIL, 
    GET_LIST_PRODUCTS_SUCCESS, 
    KEYWORD_CHANGE, 
    PAGE_CHANGE, 
    PAGE_SIZE_CHANGE, 
    STATUS_CHANGE
} from "../../action/product/product.action";
import { getListProducts } from '../../service/api/product.api';

function* getListProductsSaga({ payload }) {
    const state = yield select((state) => state.product);
    const { keyword, page, pageSize, sortBy, startDate, endDate, status } = state;
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
}

export const productSaga = function* () {
    yield takeLatest(GET_LIST_PRODUCTS, getListProductsSaga);
    yield takeLatest(STATUS_CHANGE, getListProductsSaga);
    yield takeLatest(PAGE_CHANGE, getListProductsSaga);
    yield takeLatest(PAGE_SIZE_CHANGE, getListProductsSaga);
    yield takeLatest(KEYWORD_CHANGE, getListProductsSaga);
}