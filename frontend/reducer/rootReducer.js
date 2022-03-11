import { combineReducers } from 'redux';
import homeReducer from "./home/home.reducer";
import loginReducer from "./login/login.reducer";
import productReducer from "./product/product.reducer";
import orderReducer from "./order/order.reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    home: homeReducer,
    product: productReducer,
    order: orderReducer,
});

export default rootReducer;