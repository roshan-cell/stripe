require("dotenv").config() 

const express = require("express")
const app = express()

app.use(express.json()) ;
app.use(express.static("public"))

const stripe = require("stripe")(process.env.STRIPE_KEY)

const storeItems = new Map([
    [1 , {priceInCents: 1000 , name: "Learn React"}] ,
    [2 , {priceInCents: 1000 , name: "Lea rn Fluter"}] ,
])

app.post("/create-checkout-session" , async(req,res)=> 
{
    try {
        const sessions = await stripe.checkout.create({
            payment_method_types: ['card'],
            mode: 'payment',

            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd' ,
                        product_data: {
                            name: storeItems.name
                        },
                        unit_amount: storeItems.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html` ,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json( {url: sessions.url} )   
    } catch (error) {
        res.status(500).json(error) 
    }
})

app.listen(process.env.PORT , (req,res) => {
    console.log("App is listening" , process.env.PORT)
})