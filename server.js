require("dotenv").config()

const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("public"));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map ([
    [1, {priceincents: 22999, name: "Jordan 1 High Seafoam"}],
    [2, {priceincents: 20999, name: "Jordan 1 High Prototype"}],
    [3, {priceincents: 19999, name: "Jordan 5 Retro Shattered Backboard"}],
    [4, {priceincents: 14999, name: "Jordan 1 Low Team Red"}],
    [5, {priceincents: 14999, name: "Jordan 1 Low White Grey Black"}],
    [6, {priceincents: 13999, name: "Blazer Low X Sacai British Tan"}],
    [7, {priceincents: 21999, name: "Aime Leon Dore New Balance 550 Oxford Grey"}],
    [8, {priceincents: 28999, name: "Yeezy Boost 350 V2 Mx Oat"}],
    [9, {priceincents: 21999, name: "Dunk Mid X Social Status Strawberry Milk"}],
    [10, {priceincents: 13999, name: "Nike X Undefeated Air Force 1"}],
    [11, {priceincents: 15999, name: "Air Force 1 X Space Jam"}],
    [12, {priceincents: 29999, name: "Jordan 4 Tour Yellow"}],
    [13, {priceincents: 37999, name: "Jordan 11 Cool Grey"}],
    [14, {priceincents: 16999, name: "Jordan 1 Low Mocha"}],
    [15, {priceincents: 33999, name: "Aime Leon Dore New Balance 993"}],
    [15, {priceincents: 29999, name: "Jordan 1 High Tokyo Biohack"}]

])

app.post('/create-checkout-session-custom', async (req, res) => {
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
                        unit_amount: item.priceincents
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