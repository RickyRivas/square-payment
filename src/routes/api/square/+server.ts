import { Client, ApiError, Environment } from 'square'
import { SQUARE_ACCESS_TOKEN, sandbox } from '$env/static/private'
import { v4 as uuidv4 } from 'uuid'
import type { RequestHandler } from './$types'

const isProduction = sandbox === 'true' ? false : true

const squareConfig = {
    environment: isProduction ? Environment.Production : Environment.Sandbox,
    accessToken: SQUARE_ACCESS_TOKEN
}

const defaultClient = new Client(squareConfig)
const { paymentsApi } = defaultClient;


export const POST: RequestHandler = async ({ request }) => {
    const { locationId,
        sourceId,
        amount,
        email_address,
        given_name,
        family_name,
        referenceId,
        address } = await request.json();

    // create key for unique request to Square
    const idempotencyKey = uuidv4();

    // Create payment
    try {
        const { result: { payment } } = await paymentsApi.createPayment({
            idempotencyKey,
            sourceId,
            locationId,
            amountMoney: {
                amount,
                currency: 'USD'
            },
            buyerEmailAddress: email_address,
            billingAddress: address,
            note: `Billing Reference ID: #${referenceId}`,
            statementDescriptionIdentifier: referenceId,
        })

        const result = JSON.stringify(payment, (key, value) => {
            return typeof value === 'bigint' ? parseInt(value) : value
        }, 4)

        console.log(result)
        return new Response(JSON.stringify(result), {
            status: 200
        })

    } catch (error) {
        console.log(error)
        const { errors } = JSON.parse(error.body)
        return new Response(JSON.stringify(errors[0]), {
            status: error.statusCode
        })
    }
}