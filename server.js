require("dotenv").config()

const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("public"));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map ([
    [1, {priceincents: 500, name: "Donation"}],
    [2, {priceincents: 1000, name: "Donation"}],
    [3, {priceincents: 2000, name: "Donation"}],
    [4, {priceincents: 5000, name: "Donation"}],
    [5, {priceincents: 10000, name: "Donation"}]
])

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceincents
                    },
                    quantity: item.quantity
                }

            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/make-a-donation.html`
        })
        res.json({url: session.url})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
    
})

app.listen(3001)