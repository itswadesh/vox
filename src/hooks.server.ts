import { DOMAIN } from '$lib/config'
import { gett } from '$lib/utils'
// import Cookie from 'cookie-universal'

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({ event, request, fetch }) => {
	request.headers.set('cookie', event.request.headers.get('cookie'), { path: '/' })

	return fetch(request)
}
/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = async ({ error, event }) => {
	return {
		message: 'Whoops!',
		code: error.code ?? 'UNKNOWN'
	}
}
export const handle: Handle = async ({ event, resolve }) => {
	const	initRes = await gett(`init?domain=${DOMAIN }`)
		
		return await resolve(event)
	
}
