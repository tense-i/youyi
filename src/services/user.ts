import type { User } from '@/types/user'
import { request } from '@/utils/request'
import type { CodeType } from '@/types/user'
/**
 * 登录
 * @param data
 * @returns
 */
export const loginService = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

/**
 * 发送验证码
 */
export const sendCodeService = (mobile: string, type: CodeType) => {
  return request('/code', 'GET', { mobile, type })
}

/**
 * 短信登录
 */
export const smsLoginService = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}
