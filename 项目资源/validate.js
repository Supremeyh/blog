const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const regMobile = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
// 必须包含数字、英文字母、特殊符号且为8到20位[8,20]
const regPwd = /^(?!\s)((?=.*[a-zA-Z])(?=.*[\W_])(?=.*[\d]).\S{7,19})$/
const UserLogCookie = 'userlogcookie'

export { regEmail, regMobile, regPwd, UserLogCookie }
