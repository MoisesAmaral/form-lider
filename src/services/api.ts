import axios, { type AxiosError } from 'axios'
import { toast } from 'react-toastify'
// eslint-disable-next-line camelcase

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}[] = []

export const env = import.meta.env.VITE_REACT_APP_SERV_ENV
let baseURLApi = `http://api-pagamentos-${env}.lider.lan`
if (env === 'prod') {
  baseURLApi = 'http://api-pagamentos.lider.lan'
}
export const apiToCall = axios.create({
  baseURL: baseURLApi,
  headers: {
    'Content-Type': 'application/json',
  },
})

let baseURLAuth = `http://api-auth-${env}.lider.lan`
if (env === 'prod') {
  baseURLAuth = 'http://api-auth.lider.lan'
}
export const api = axios.create({
  baseURL: baseURLAuth,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'X-LiderAviacao-Api-Key': '716ff650-0851-46db-b49c-a2661c49afeb',
    'Content-Type': 'application/json',
  },
})
apiToCall.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken')
      const token = localStorage.getItem('token')
      const originalConfig: any = error.config
      if (!isRefreshing) {
        isRefreshing = true

        api
          .post('/Autenticar/refresh', {
            refreshToken,
            token,
          })
          .then(response => {
            const { token, refreshToken } = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)

            api.defaults.headers.Authorization = `Bearer ${token}`

            // biome-ignore lint/complexity/noForEach: <explanation>
            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          })
          .catch(err => {
            // biome-ignore lint/complexity/noForEach: <explanation>
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`
              resolve(apiToCall(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`
              resolve(apiToCall(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }
    }
    if (error.response?.status === 403) {
      const isError: any = error.response.data
      toast.warn(isError, {
        autoClose: 10000,
        style: { color: 'var(--gray-600)' },
      })
    }
    return Promise.reject(error)
  }
)
