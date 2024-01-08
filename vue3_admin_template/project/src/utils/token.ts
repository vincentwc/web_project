// 封装本地存储存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKNE', token)
}

// 封装本地存储读取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
