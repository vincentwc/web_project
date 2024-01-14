// 统一管理项目用户相关接口
import request from '@/utils/request'
import type { loginForm, loginResponseData,userResponseData } from './type'
// 统一管理接口
enum API {
  LOGIN_USER = '/user/login',
  USERINFO_URL = '/user/info',
}
// 对外暴漏请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_USER, data)
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL)
