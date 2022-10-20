import { getAPI } from '$lib/util/api'
import { gett } from '$lib/utils'
import { error } from '@sveltejs/kit'
export const prerender = false

export async function load({ params, parent, locals, url, request }) {
	const { me, cart } = locals
	try {
		const addressId = url.searchParams.get('address')

		const paymentMethods = [
			{
				active: true,
				name: 'Cash on Delivery',
				value: 'cod',
				img: 'https://cdn-icons-png.flaticon.com/512/2331/2331895.png',
				color: '',
				position: 1,
				key: '',
				text: 'Pay the full amount when item is delivered',
				type: 'cod',
				imgCdn: 'https://cdn-icons-png.flaticon.com/512/2331/2331895.png'
			},
			{
				active: true,
				name: 'Online with Cashfree',
				value: 'cashfree',
				img: 'https://misiki.s3.ap-south-1.amazonaws.com/img/cashfree.jpg',
				color: '',
				position: 2,
				key: '',
				text: 'Pay the full amount with online / UPI / Wallets / Credit Cards / Debit Cards',
				type: 'pg',
				imgCdn: 'https://ik.imagekit.io/3wzatecz51w3i/s3/img/cashfree.jpg'
			},
			{
				active: true,
				name: 'Online with Razorpay',
				value: 'razorpay',
				img: '/razorpay-icon.jpg',
				color: '',
				position: 3,
				key: '',
				text: 'Pay the full amount with online / UPI / Wallets / Credit Cards / Debit Cards',
				type: 'pg',
				imgCdn: '/razorpay-icon.jpg'
			}
		]
		const address = await gett(`addresses/${addressId}`, request.headers.get('cookie'))

		if (paymentMethods) {
			return { paymentMethods, address, addressId, me, cart }
		}
	} catch (e) {
		throw error(400, e?.message)
	}
	throw error(500, 'Internal Server Error')
}
