import { error, type Handle } from '@sveltejs/kit'
import * as env from '$env/static/private'
const SENTRY_DSN = env.SECRET_SENTRY_DSN
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

import * as Sentry from '@sentry/svelte'
import { BrowserTracing } from '@sentry/tracing'

if (SENTRY_DSN) {
	Sentry.init({
		dsn: SENTRY_DSN,
		integrations: [new BrowserTracing()],
		tracesSampleRate: 1.0
	})
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({ event, request, fetch }) => {
	request.headers.set('cookie', event.request.headers.get('cookie'), { path: '/' })

	return fetch(request)
}
/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = async ({ error, event }) => {
	Sentry.captureException(error, { event })
	return {
		message: 'Whoops!',
		code: error.code ?? 'UNKNOWN'
	}
}
export const handle: Handle = async ({ event, resolve }) => {
	const	initRes = await gett(`init?domain=${DOMAIN}`)
		
		return await resolve(event)
	
}
