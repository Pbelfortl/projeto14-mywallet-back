import express from 'express'
import { registration, signIn } from '../controllers/accountController.js'


const accountRouter = express.Router()

accountRouter.post("/signUp", registration)

accountRouter.post("/login", signIn)

export default accountRouter