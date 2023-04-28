import type { RequestHandler } from './$types'
import { z } from 'zod'

const registerSchema = z.object({
    fname: z.string({ required_error: 'First name is required.' }).min(1, { message: 'First name is required.' }).max(64, { message: 'First name must be less than 64 characters.' }).trim(),
    lname: z.string({ required_error: 'Last name is required.' }).min(1, { message: 'Last name is required.' }).max(64, { message: 'Last name must be less than 64 characters.' }).trim(),
    email: z.string({ required_error: 'Email is required.' }).min(1, { message: 'Email is required.' }).max(64, 'Email must be under 64 char.').email(),
    address1: z.string({ required_error: 'Address is required.' }).min(1, { message: 'Address is required.' }).trim(),
    city: z.string({ required_error: 'City is required.' }).min(1, { message: 'City is required.' }).trim(),
    referenceid: z.string({ required_error: 'Reference Id is required.' }).min(1, { message: 'Reference Id is required.' }).max(64, { message: 'Reference Id must be less than 64 characters.' }).trim(),
    postal: z.string({ required_error: 'Postal / Zip code is required.' }).min(5, { message: 'Postal code must be 5 char. long.' }).max(5, { message: 'Postal code must be 5 char. long.' }).trim()
})

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()
    console.log(data)

    try {
        const result = registerSchema.parse(data)
        console.log('SUCCESS', result)
        return new Response(JSON.stringify(result), {
            status: 200
        })
    } catch (e) {
        const { fieldErrors } = e.flatten()
        return new Response(JSON.stringify({ errors: fieldErrors }), {
            status: 400
        })
    }
}