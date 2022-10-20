// import { getAPI } from '$lib/util/api'
export const prerender = false

import { DOMAIN, HTTP_ENDPOINT } from '$lib/config'
import { gett } from '$lib/utils'
import { error } from '@sveltejs/kit'

export async function load({ url, request, locals, cookies }) {
	try {
		const isDesktop = request.headers.get('sec-ch-ua-mobile') === '?0'
		const listOfPagesWithoutBackButton = [
			'/',
			'/categories',
			'/new-arrivals',
			'/my/wishlist',
			'/my',
			'/payment/success'
		]
		const isShowBackButton = !listOfPagesWithoutBackButton.includes(url?.pathname)
		// const isHome = url.pathname === '/'
		const currentPage = +url.searchParams.get('page') || 1
		const q = url.searchParams.get('q') || ''
		// let cart, store, me, serializedCart, serializedStore, serializedMe

		const d1 = new Date()

		const cartRes = await gett('carts/my', request.headers.get('cookie'))
		const cart = {
			cartId: cartRes.cart_id,
			items: cartRes.items,
			qty: cartRes.qty,
			tax: cartRes.tax,
			subtotal: cartRes.subtotal,
			total: cartRes.total,
			currencySymbol: cartRes.currencySymbol,
			discount: cartRes.discount,
			selfTakeout: cartRes.selfTakeout,
			shipping: cartRes.shipping,
			unavailableItems: cartRes.unavailableItems,
			formattedAmount: cartRes.formattedAmount
		}
		locals.cart = cart
		locals.url = url.href
		locals.currentPage = currentPage
		locals.q = q
		// me,
		locals.isDesktop = isDesktop
		locals.isShowBackButton = isShowBackButton
		return locals
	} catch (e) {
		throw error(
			404,
			`Store Not Found @Layout 
			<br/>ID: ${locals.store.id}
			<br/>ORIGIN: ${locals.origin}
			<br/>DOMAIN(env): ${DOMAIN}
			<br/>HTTP_ENDPOINT(env): ${HTTP_ENDPOINT}`
		)
	}
}
