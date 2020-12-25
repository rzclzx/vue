import request from './axios/baseAxios'

export function get(params) {
  return request({
    url: 'api/dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/dept',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/dept',
    method: 'delete',
    data: [id]
  })
}

export function edit(data) {
  return request({
    url: 'api/dept',
    method: 'put',
    data
  })
}
