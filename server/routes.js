import { Router } from 'express'
import bodyParser from 'body-parser'

import viewController from './controllers/viewController.js'

const routes = Router()

routes.use(bodyParser.json({ limit: '50mb' }))

// HTML pages
routes.get('/', viewController.index)
routes.get('/about', viewController.about)
routes.get('/community', viewController.community)
routes.get('/contact', viewController.contact)
routes.get('/blog', viewController.blogIndex)
routes.get('/blog/:url', viewController.blogPost)

// Backend requests
routes.post('/mailing-list', viewController.mailingList)

export default routes
