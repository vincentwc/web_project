// 封装本地存储存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 封装本地存储读取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 本地村存储删除数据的方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
