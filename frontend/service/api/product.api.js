import axiosSerivce from './axiosService';

export function getListProducts(page = 1, pageSize = 10, keyword='', sortByTime='', status='' ){
    return axiosSerivce.get(`product/getAll`
        + `?page=${page}`
        + `&pageSize=${pageSize}`
        + `&keyword=${keyword}`
        + `&sortByTime=${sortByTime}`
        + `&sortByStatus=${status}`);
}