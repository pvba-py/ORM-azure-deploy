import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true
})
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const url = error.config?.url || ''

    const isAuthEndpoint =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/me') ||
      url.includes('/auth/refresh') ||
      url.includes('/auth/logout')

    if (status === 401 && !isAuthEndpoint) {
      console.warn('Unauthorized request:', url)

      // Avoid sudden hard redirect if you are debugging.
      // Let route guard/authStore handle it.
      // window.location.href = '/'
    }

    return Promise.reject(error)
  }
)


export default api