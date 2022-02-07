import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { homeConstant } from "../../constants/home/home.constant";
import {
    ADD_PHONE,
} from "../../action/home/home.action";

// call api
const homeSocket = function (data) {
    // return eventChannel(emitter => {
    //     //gửi
    //     socket.send(SOCKET_WORKING_SINGLE_NUMBER, {
    //         phone: data.data.phone,
    //         money: data.data.money,
    //         urlID: data.data.urlID
    //     });

    //     //nhận
    //     socket.receive(SOCKET_WORKING_ADDED_NUMBER, function (data) {
    //         // console.log("home.saga from server", data);
    //         emitter(data || '');
    //     });


    //     return () => {
    //         //unscrible
    //     };
    // });
}

// nhận kết quả từ api
const addNumberSaga = function* (action) {
    //laasy vee fkeest quar cuar event channel redux
    let result = yield call(homeSocket, action);

    //kết quả của socket
    // while (true) {
    //     let responce = yield take(result);
    //     console.log("responce added", responce);
    //     if (responce.status == 200) {
    //         console.log("responce added", responce.data);
    //         yield put({
    //             type: ADD_PHONE_SUCCESS,
    //             value: responce.data
    //         });
    //     } else {
    //         console.log("responce add fail ", responce.status);
    //         yield put({
    //             type: ADD_PHONE_FAIL,
    //             value: responce.status
    //         });
    //     }
    // }
}

export const watchHome = function* () {
    yield takeLatest(ADD_PHONE, addNumberSaga);
}