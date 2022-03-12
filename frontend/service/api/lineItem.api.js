import axiosSerivce from './axiosService';

export function updateStatus(id, status, machine_id) {
    return axiosSerivce.post(`api/lineItem/updateStatus`, {
        id: id, 
        status: status,
        machine_id: machine_id
    });
}
