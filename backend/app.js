const express = require('express')
const app = express()
const port = 3001
const authRouter = require('./routers/authRouter')
const boardsRouter = require('./routers/boardsRouter')
const blocksRouter = require('./routers/blocksRouter')
const tasksRouter = require('./routers/tasksRouter')
const invitesRouter = require('./routers/invitesRouter')
const profileRouter = require('./routers/profileRouter')

const cors = require('cors');

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use("/auth", authRouter)
app.use("/", boardsRouter)
app.use("/", blocksRouter)
app.use("/", tasksRouter)
app.use("/", invitesRouter)
app.use("/", profileRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});