import request from './request'

export const getUsers = (name, currentPage, pageSize) => {
  console.log('/getUsers?name=' + name)
  return request({
    url:
      '/getUsers?name=' +
      name +
      '&currentPage=' +
      currentPage +
      '&pageSize=' +
      pageSize,
    method: 'GET'
  })
}

export const addUser = (user) => {
  return request({
    url: '/addUser',
    method: 'POST',
    data: user
  })
}

export const delUser = (userId) => {
  return request({
    url: '/user/' + userId,
    method: 'DELETE'
  })
}
export const editUser = (user) => {
  return request({
    url: '/editUser',
    method: 'Put',
    data: user
  })
}
export const getAllRoles = () => {
  return request({
    url: '/getAllRoles',
    method: 'get'
  })
}
export const getRolesByUserId = (userId) => {
  return request({
    url: '/getRolesByUserId?userId=' + userId,
    method: 'GET'
  })
}
