import request from './request';

/**
 * 获取用户详情信息
 * @param {string} userId 用户ID
 * @return {Promise} 返回一个Promise对象，成功时携带用户详情信息
 */
export function getProfileDetail(userId) {
  // 发起GET请求获取指定用户的详情信息
  return request.get(`/profile/detail/${userId}`);
}

/**
 * 上传文件
 * @param {File} file 需要上传的文件对象
 * @return {Promise} 返回一个请求 promise，用于处理上传的响应
 */
export function upload(file) {
  // 创建 FormData 对象，并添加文件
  const formData = new FormData();
  formData.append('file', file);
  // 发送 POST 请求上传文件
  return request.post('/upload', formData);
}

/**
 * 编辑用户信息
 * @param {string} userId 用户ID
 * @param {object} profile 用户信息对象
 * @return {Promise} 返回一个请求 promise，用于处理上传的响应
 */
export const editProfile = (userId, profile) => request.post('/profile', { userId, ...profile });
