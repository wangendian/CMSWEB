import request from './request'

export const getPermissions = (name, currentPage, pageSize) => {
  console.log('/getPermissions?name=' + name)
  return request({
    url:
      '/getPermissions?name=' +
      name +
      '&currentPage=' +
      currentPage +
      '&pageSize=' +
      pageSize,
    method: 'GET'
  })
}
