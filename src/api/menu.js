import request from './axios/baseAxios'

export function getMenusTree(params) {
  return request({
    url: 'api/menus/tree',
    method: 'get',
    params
  })
}

export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

export function get(params) {
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/menus',
    method: 'delete',
    data: [id]
  })
}

export function edit(data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}