import axiosSerivce from './axiosService';

export function getDetailByID(id) {
    return axiosSerivce.get(`api/fulfillment/getDetailByID?id=${id}`);
}
