const axios = require('axios');

export async function requestGet(url, param, onSuccess, onFailed) {
    axios.get(url, {
        params: param
    })
        .then(onSuccess)
        .catch(onFailed)
}

export async function requestPost(url, body, onSuccess, onFailed) {
    axios.post(url, body)
        .then(onSuccess)
        .catch(onFailed)
}