import { Router } from 'express'
import bodyParser from 'body-parser'

import viewController from './controllers/viewController'

const routes = Router()

routes.use(bodyParser.json({ limit: '50mb' }))

routes.get('/', viewController.index)
routes.post('/mailing-list', viewController.mailingList)

export default routes
