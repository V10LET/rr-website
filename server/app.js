import * as path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import engines from 'consolidate'
import favicon from 'serve-favicon'
import db from './db/index.js'

import routes from './routes.js'

// Initialize the database
db.init()

// Initialize the server
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

// Handle "404 not found" errors
app.use(function(req, res, next) {
    res.status(404)
    res.render('404.html')
})

export default app
