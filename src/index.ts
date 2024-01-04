/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import express from 'express'
import { router } from './_routes/routes'
import { operator } from './operator'
// App Declaration
const app: express.Application = express()

// Settings
app.set('port', 3000)

// Middlewares
app.use(express.json())

// Routes
app.use('/', router)

// Server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})

// Cron
operator
