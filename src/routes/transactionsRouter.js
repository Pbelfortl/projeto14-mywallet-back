import express from 'express'
import { deleteRecord, getRecords, inputRecord, outputRecord } from '../controllers/transactionsController.js'


const transactionsRouter = express.Router()

transactionsRouter.get("/records", getRecords)

transactionsRouter.post("/records/input", inputRecord)

transactionsRouter.post("/records/output", outputRecord)

transactionsRouter.delete("/deleteRecord/:id", deleteRecord)

export default transactionsRouter