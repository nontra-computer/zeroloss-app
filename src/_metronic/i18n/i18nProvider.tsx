import { FC } from 'react'
import { useLang } from './Metronici18n'
import { IntlProvider } from 'react-intl'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/th'

import enMessages from './messages/en.json'
import thMessages from './messages/th.json'

import { WithChildren } from '../helpers'

const allMessages = {
	en: enMessages,
	th: thMessages,
}

const I18nProvider: FC<WithChildren> = ({ children }) => {
	const locale = useLang()
	const messages = allMessages[locale]

	return (
		<IntlProvider locale={locale} messages={messages}>
			{children}
		</IntlProvider>
	)
}

export { I18nProvider }
