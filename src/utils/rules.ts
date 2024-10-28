/**
 * 手机号规则
 */
const mobileRules = [{ required: true, message: '请输入手机号' }, {
  pattern: /^1[3-9]\d{9}$/,
  message: '手机号格式不正确'
}]

/**
 * 密码规则
 */
const passwordRules = [
  { required: true, message: '请输入密码' },
  {
    // 只要在4-20个字符之间
    pattern: /^\S{4,20}$/,
    message: '密码需要4-20个字符，且不能包含空格'
  }
]

/**
 * 验证码规则
 */
const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码6个数字' }
]

export { mobileRules, passwordRules, codeRules }
