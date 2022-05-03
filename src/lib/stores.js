import { writable } from 'svelte/store'

export const number = writable(0)
export const scroll = writable(true)
export const user = writable({
    timeout: -1,
})

export const contactConfig = writable({
  siteOwner: 'Ahmed Mitry',
  siteName: 'ahmedmitry.com',
  siteEmail: 'inquiries@ahmedmitry.com',
  thankYou: true,
})
