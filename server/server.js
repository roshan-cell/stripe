require("dotenv").config() 

const express = require("express")
const app = express()

app.use(express.json()) ;

const stripe = require("stripe")(process.env.STRIPE_KEY)

const storeItems = new Map([
    [1 , {priceInRupee: 1000 , name: "Learn React"}] ,
    [2 , {priceInRupee: 1000 , name: "Learn Fluter"}] ,
    [3, {priceInRupee: 1000 , name: "Learn DSA"}] 
])

app.listen(process.env.PORT , (req,res) => {
    console.log("App is listening" , process.env.PORT)
})