import * as path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import engines from 'consolidate'
import favicon from 'serve-favicon'

import routes from './routes'

const app = express()

// Middleware
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use('/', express.static(`${__dirname}/public`))
app.set('views', `${__dirname}/views`)
app.engine('html', engines.mustache)
app.set('view engine', 'html')

app.use('/', routes)

export default app
