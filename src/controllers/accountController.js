
import { accountSchema } from "../app.js"
import bcrypt from "bcrypt"
import {db} from "../app.js"
import {v4 as uuid} from "uuid"


export async function registration  (req, res) {

    const validation  = accountSchema.validate(req.body)
    const {name, email, password}= req.body
    const inUse = await db.collection('users').findOne({email:email})

    if(validation.error){
        return res.sendStatus(422)
    }

    if(inUse){
        return res.status(409).send('Usuário já cadastrado')
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    try{

        await db.collection('users').insertOne({name:name, email:email, password:passwordHash})
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
    }

}

export async function signIn (req, res) {

    const email = req.body.email
    const password = req.body.password
    const account = await db.collection('users').findOne({email:email})

    if(!account || (bcrypt.compareSync(password, account.password)) === false){
        return res.sendStatus(401)
    }

    try{
        
        const user = await db.collection('transactions').findOne({email:email})
        const token = uuid()

        await db.collection('sessions').insertOne({
            userId: user._id,
            token
        })

        res.status(200).send({
            name:account.name,
            email:email,
            token            
        })
    } catch (err) {
        res.sendStatus(500)
    }
}