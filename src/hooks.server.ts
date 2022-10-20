import { error, type Handle } from '@sveltejs/kit'
// import * as env from '$env/static/private'
// const SENTRY_DSN = env.SECRET_SENTRY_DSN
import {
	stripePublishableKey,
	id,
	logo,
	email,
	address,
	phone,
	websiteName,
	websiteLegalName,
	domain,
	description,
	keywords,
	siteTitle,
	facebookPage,
	linkedinPage,
	instagramPage,
	twitterPage,
	pinterestPage,
	youtubeChannel,
	GOOGLE_ANALYTICS_ID,
	GOOGLE_CLIENT_ID,
	DOMAIN,
	HTTP_ENDPOINT
} from '$lib/config'
import { gett } from '$lib/utils'
// import Cookie from 'cookie-universal'

// import * as Sentry from '@sentry/svelte'
// import { BrowserTracing } from '@sentry/tracing'

// if (SENTRY_DSN) {
// 	Sentry.init({
// 		dsn: SENTRY_DSN,
// 		integrations: [new BrowserTracing()],
// 		tracesSampleRate: 1.0
// 	})
// }

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({ event, request, fetch }) => {
	request.headers.set('cookie', event.request.headers.get('cookie'), { path: '/' })

	return fetch(request)
}
/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = async ({ error, event }) => {
	// Sentry.captureException(error, { event })
	return {
		message: 'Whoops!',
		code: error.code ?? 'UNKNOWN'
	}
}
export const handle: Handle = async ({ event, resolve }) => {
	try {
		let initRes
		const WWW_URL = 'https://vox-9nw.pages.dev'
		event.locals.origin = WWW_URL
		const cookieStore = event.cookies.get('store')
		let store = {
			id,
			domain,
			logo,
			email,
			address,
			phone,
			otpLogin: false,
			websiteName,
			websiteLegalName,
			title: siteTitle,
			description,
			keywords,
			facebookPage,
			instagramPage,
			twitterPage,
			linkedinPage,
			pinterestPage,
			youtubeChannel,
			GOOGLE_CLIENT_ID,
			GOOGLE_ANALYTICS_ID,
			stripePublishableKey,
			DOMAIN,
			isFnb: false
		}
		if (!cookieStore || cookieStore === 'undefined') {
			initRes = await gett(`init?domain=kitcommerce.tech`)
		} else {
			store = JSON.parse(cookieStore)
		}
		event.locals.store = store
		
		event.request.headers.delete('connection')
		return await resolve(event)
	} catch (e) {
		const err = `Store Not Found @Hook 
			<br/>ID: ${event.locals.store?.id}
			<br/>ORIGIN: ${event.locals?.origin}
			<br/>DOMAIN(env): ${DOMAIN}
			<br/>HTTP_ENDPOINT(env): ${HTTP_ENDPOINT}`
		console.log('Err at Hooks...', err)
		throw error(404, err)
	}
}
