require("dotenv").config() 

const express = require("express")
const app = express()

app.use(express.json()) ;
app.use(express.static("public"))

const stripe = require("stripe")(process.env.STRIPE_KEY)

const storeItems = new Map([
    [1 , {priceInRupee: 1000 , name: "Learn React"}] ,
    [2 , {priceInRupee: 1000 , name: "Learn Fluter"}] ,
])

app.post("/create-checkout-session" , (req,res)=> {
    res.json({ url : "Hi" })
})

app.listen(process.env.PORT , (req,res) => {
    console.log("App is listening" , process.env.PORT)
})