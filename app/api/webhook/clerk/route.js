import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { createUser } from '@/actions/user.actions'

export async function POST(req) {
    try {
        // req is the NextRequest object passed by Next.js
        const evt = await verifyWebhook(req)

        // Do something with payload
        // For this guide, log payload to console
        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        console.log('Webhook payload:', evt.data)

        if (evt.type === 'user.created') {
            const { email_addresses, image_url, first_name, last_name } = evt.data
            const user = {
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`,
                imgUrl: image_url,
            }
            const newUser = await createUser(user)
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}