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

export function searchLineItems(page = 1, pageSize = 10, keyword = '', sortBy = '', startDate = '', endDate = '', status = '') {
    return axiosSerivce.get(`api/order/searchLineItems`
        + `?page=${page}`
        + `&pageSize=${pageSize}`
        + `&keyword=${keyword}`
        + `&sortBy=${sortBy}`
        + `&startDate=${startDate}`
        + `&endDate=${endDate}`
        + `&status=${status}`);
}


export function getLineItemsBySKU(sku='', keyword='') {
    return axiosSerivce.get(`api/order/getLineItemsBySKU`
        + `?sku=${sku}`
        + `&keyword=${keyword}`);
}

export function getLineItemsByID(id='', keyword='') {
    return axiosSerivce.get(`api/order/getLineItemsByID`
        + `?id=${id}`
        + `&keyword=${keyword}`);
}