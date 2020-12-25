import request from './axios/baseAxios'

export function add(data) {
  return request({
    url: 'api/job',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/job',
    method: 'delete',
    data: [id]
  })
}

export function edit(data) {
  return request({
    url: 'api/job',
    method: 'put',
    data
  })
}
