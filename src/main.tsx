import { createRoot } from 'react-dom/client'
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

// Apps
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import AppContext from './Context/AppContext'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'

// Zeroloss Styles and Customized Components Styles
import './Styles/main.scss'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'

/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider } from './app/modules/auth'
import { setupAxios } from './Configuration/Axios'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

// const isProduction = process.env.NODE_ENV === 'production'
const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
	createRoot(container).render(
		<QueryClientProvider client={queryClient}>
			<MetronicI18nProvider>
				<AuthProvider>
					<AppContext>
						<AppRoutes />
					</AppContext>
				</AuthProvider>
			</MetronicI18nProvider>
			{/* {!isProduction && <ReactQueryDevtools initialIsOpen={false} />} */}
		</QueryClientProvider>
	)
}
