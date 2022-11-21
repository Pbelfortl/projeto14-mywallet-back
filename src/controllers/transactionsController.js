import { transactionSchema } from '../app.js'
import {db} from "../app.js"
import dayjs from 'dayjs'


export async function getRecords (req, res)  {

    const email = req.headers.email

    if(!email){
        return res.sendStatus(404)
    }

    try {
        const transactions = await db.collection("transactions").find({email:email}).toArray()

        res.status(200).send(transactions)
    }catch (err) {
        res.sendStatus(500)
    }
}

export async function inputRecord (req, res) {
    const email = req.headers.email
    const {value, description} = req.body
    const validation = transactionSchema.validate(req.body)

    if(validation.error){
        return res.sendStatus(400)
    }

    try{
        await db.collection('transactions').insertOne({
            email:email,
            value:value,
            description: description,
            type:'input',
            date:dayjs().format('DD/MM')
        })
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }

}

export async function outputRecord (req, res) {

    const email = req.headers.email
    const transaction = req.body
    const { value, description} = req.body
    const validation = transactionSchema.validate(transaction)

    if(validation.error){
        return res.sendStatus(400)
    }

    try{
        await db.collection('transactions').insertOne({
            email:email,
            value:value,
            description: description,
            type:'output',
            date:dayjs().format('DD/MM')
        })
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }

}