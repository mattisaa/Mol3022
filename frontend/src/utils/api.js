import axios from 'axios';
import { API_URL, HEADERS } from '../config';

const api = axios.create({
  baseURL: API_URL,
  crossDomain: true,
  headers: HEADERS
});

export function get(url) {
  return api
    .get(`${url}`)
    .then(res => res)
    .catch(err => err.response);
}

export function put(url, data) {
  return api
    .put(`${url}`, data)
    .then(res => res)
    .catch(err => err.response);
}

export function post(url, body) {
  return api
    .post(`${url}`, body)
    .then(res => res)
    .catch(err => err.response);
}

export function remove(url) {
  return api
    .delete(`${url}`)
    .then(res => res)
    .catch(err => err.response);
}
