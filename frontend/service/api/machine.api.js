import axiosSerivce from './axiosService';

export function getMachines() {
    return axiosSerivce.get(`api/machine/getAll`);
}
