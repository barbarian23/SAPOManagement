import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { LOGIN, OPEN_OTP_SCREEN, LOGIN_ERROR, LOGGINGIN, GO_TO_HOME  } from "../../action/login/login.action";
import { LOGIN_STATUS_TEXT } from "../../constants/login/login.constant";
import { loginConstant } from "../../constants/login/login.constant";
// connect to server

const login = function* (data) {
    yield put({ type: LOGGINGIN, value: true });

    //gọi hàm lắng nghe socket
    //let result = yield call(loginSocket, data);

    //kết quả của socket
    // while (true) {
    //     let responce = yield take(result);

        // if (responce) {
        //     console.log("responce", responce);
        //     if (responce.data == 1) {
        //         yield put({
        //             type: OPEN_OTP_SCREEN
        //         })
        //     } else if (responce.data == -1) {
        //         yield put({
        //             type: LOGIN_ERROR,
        //             value: "Đăng nhập lỗi, hãy thử lại"
        //         })
        //     }else if (responce.data == 3) {
        //         yield put({
        //             type: GO_TO_HOME
        //         })
        //     }
        //     yield put({ type: LOGGINGIN, value: false });
        // }
    //}
}

const loginStatus = function* (data) {
    yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginSuccess });
}

//watcher
export const watchLogin = function* () {
    yield takeLatest(LOGIN, login);
}