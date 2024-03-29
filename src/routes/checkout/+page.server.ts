export const prerender = false;
import { SQUARE_APPLICATION_ID, LOCATION_ID } from '$env/static/private'
import type { Actions } from './$types';

export async function load() {
    return { SQUARE_APPLICATION_ID, LOCATION_ID }
}

export const actions: Actions = {
    validateForm: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData())
        console.log(formData)
    }
}