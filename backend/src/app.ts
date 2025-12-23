import express, { type Request, type Response } from 'express'
import path from 'node:path'
const app = express()
import('./todo/todoController.ts')
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Tells express where templates are, in this case inside views
app.set("views", path.join(__dirname, "views"))

// Tells express what template engine to use, in this case ejs
app.set("view engine", "ejs")

app.get("/", (req:Request, res:Response) => {
    res.render('Home.ejs')
})

export default app