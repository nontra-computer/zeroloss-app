import { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
// import { useAuthStore } from 'Store/Auth'
// import { useAuthSessionStore } from 'Store/AuthSession'
import Swal from 'sweetalert2'
// import mainAxios from 'axios'

export function setupAxios(axios: any) {
	axios.defaults.baseURL = import.meta.env.VITE_APP_ZEROLOSS_API_URL
	axios.defaults.headers.Accept = 'application/json'

	axios.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			// const accessToken = useAuthStore.getState().accessToken
			// const sessionAccessToken = useAuthSessionStore.getState().accessToken

			// if (accessToken || sessionAccessToken) {
			// 	config.headers.Authorization = `Bearer ${accessToken ? accessToken : sessionAccessToken}`
			// }
			return config
		},
		async (error: any) => {
			return Promise.reject(error)
		}
	)

	axios.interceptors.response.use(
		(response: AxiosResponse) => {
			return response
		},
		async (error: any) => {
			const originalRequest = error?.config

			if (error?.response?.status === 401 && !originalRequest?._retry) {
				// originalRequest._retry = true
				// const refreshToken = useAuthStore.getState().refreshToken
				// if (refreshToken) {
				// 	// @ts-ignore
				// 	const [isError, request] = mainAxios
				// 		.post('/auth-buyer/refresh-token', undefined, {
				// 			headers: {
				// 				Authorization: `Bearer ${refreshToken}`,
				// 			},
				// 		})
				// 		.then(({ data }) => {
				// 			const { accessToken } = data
				// 			useAuthStore.setState({
				// 				accessToken,
				// 			})
				// 			axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
				// 			return [false, axios.request(originalRequest)]
				// 		})
				// 		.catch(error => {
				// 			useAuthStore.getState().clearState()
				// 			return [true, Promise.reject(error)]
				// 		})
				// 	if (isError) {
				// 		useAuthStore.getState().clearState()
				// 		useAuthSessionStore.getState().clearState()
				// 	}
				// 	return Promise.resolve(request)
				// } else {
				// 	useAuthStore.getState().clearState()
				// 	useAuthSessionStore.getState().clearState()
				// }
			} else if (JSON.parse(JSON.stringify(error))?.status === null) {
				Swal.fire({
					title: 'ไม่สามารถเชื่อมต่อกับระบบได้',
					text: 'กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ',
					icon: 'error',
					customClass: {
						confirmButton: 'btn btn-sm btn-kumopack-primary-600 text-kumopack-base-white',
					},
					confirmButtonText: 'ตกลง',
				})
			}

			return Promise.reject(error)
		}
	)
}
