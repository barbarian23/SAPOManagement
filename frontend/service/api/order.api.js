import axiosSerivce from './axiosService';

export function getListOrders(page = 1, pageSize = 10, keyword = '', sortBy = '', startDate = '', endDate = '', status = '') {
    return axiosSerivce.get(`api/order/search`
        + `?page=${page}`
        + `&pageSize=${pageSize}`
        + `&keyword=${keyword}`
        + `&sortBy=${sortBy}`
        + `&startDate=${startDate}`
        + `&endDate=${endDate}`
        + `&status=${status}`);
}
