


// @ts-ignore
export const sandboxApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/',
  timeout: 5000
})

// @ts-ignore
export const jeopardyApi = axios.create({
  baseURL: 'https://jservice.io/api',
  timeout: 5000
})