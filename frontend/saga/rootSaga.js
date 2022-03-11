import { select, take, all } from 'redux-saga/effects';
import { watchLogin } from "./login/login.saga";
import { watchHome } from "./home/home.saga";
import { productSaga } from "./product/product.saga";
import { orderSaga } from "./order/order.saga";

//quan sát toàn bộ các action
const watchAndLog = function* () {
    while (true) {
        const action = yield take('*');
        const state = yield select();
        // console.log('action', action);
        // console.log('state after', state);
    }
}

const rootSaga = function* () {
    yield all([
        watchAndLog(),
        watchLogin(),
        watchHome(),
        productSaga(),
        orderSaga(),
    ])
}

export default rootSaga;