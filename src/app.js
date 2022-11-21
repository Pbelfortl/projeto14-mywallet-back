import express from "express";
import cors from "cors"
import joi from 'joi'
import dotenv from "dotenv"
import {MongoClient} from "mongodb"
import accountRouter from "./routes/transactionsRouter.js";
import transactionsRouter from "./routes/accountRouter.js";
dotenv.config()


const app = express()
const router = express.Router()
app.use(router)
router.use(express.json())
router.use(cors())

const mongoClient = new MongoClient(process.env.MONGO_URI)
export const db = mongoClient.db("mywallet")

export const accountSchema = joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
})

export const transactionSchema = joi.object({
    email:joi.string().email(),
    value:joi.number().required(),
    description:joi.required(),
})

router.use(accountRouter)
router.use(transactionsRouter)

app.listen(5000, () => {
    console.log('running on port:5000')
})