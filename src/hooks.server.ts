import { error, type Handle } from '@sveltejs/kit'
import { gett } from '$lib/utils'
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
		const	initRes = await gett(`init?domain=kitcommerce.tech`)
		event.request.headers.delete('connection')
		return await resolve(event)
	} catch (e) {
		throw error(404, 'err')
	}
}
