import request from './request'

export const getRoles = (name, currentPage, pageSize) => {
  return request({
    url:
      '/getRoles?name=' +
      name +
      '&currentPage=' +
      currentPage +
      '&pageSize=' +
      pageSize,
    method: 'GET'
  })
}

export const addRole = (role) => {
  return request({
    url: '/addRole',
    method: 'POST',
    data: role
  })
}

export const delRole = (roleId) => {
  return request({
    url: '/role/' + roleId,
    method: 'DELETE'
  })
}
export const editRole = (role) => {
  return request({
    url: '/editRole',
    method: 'Put',
    data: role
  })
}
export const getAllPermissions = () => {
  return request({
    url: '/getAllPermissions',
    method: 'get'
  })
}
export const getPermissionsByRoleId = (roleId) => {
  return request({
    url: '/getPermissionsByRoleId?roleId=' + roleId,
    method: 'GET'
  })
}
