import request from './axios/baseAxios'

export function index(params) {
  return request({
    url: 'index',
    method: 'get',
    params
  })
}