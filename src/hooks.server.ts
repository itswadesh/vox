import { error, type Handle } from '@sveltejs/kit'
import { gett } from '$lib/utils'
/** @type {import('@sveltejs/kit').HandleFetch} */

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const	initRes = await gett(`init?domain=kitcommerce.tech`)
		return await resolve(event)
	} catch (e) {
		throw error(404, 'err')
	}
}
