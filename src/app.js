import express from "express";
import cors from "cors"
import joi from 'joi'
import dotenv from "dotenv"
import dayjs from "dayjs";
import {MongoClient} from "mongodb"
import bcrypt from 'bcrypt'
import {registration, signIn} from "./controllers/accountController.js"
import {getRecords, inputRecord, outputRecord} from "./controllers/transactionsController.js"
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())

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


app.post("/cadastro", registration)

app.post("/login", signIn)

app.get("/records", getRecords)

app.post("/records/input", inputRecord)

app.post("/records/output", outputRecord)

app.listen(5000, () => {
    console.log('rodando na 5000')
})