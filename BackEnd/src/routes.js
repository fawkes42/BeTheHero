const express = require('express')
const routes = express.Router()
const OngController = require('./controller/OngController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')

routes.get('/ong', OngController.index)
routes.post('/ong', OngController.create)
routes.get('/incident', IncidentController.index)
routes.post('/incident', IncidentController.create)
routes.delete('/incident/:id', IncidentController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/session', SessionController.create)


module.exports = routes