const connection = require('../database/connection')

module.exports = {
    async index (request, response) {
        const OngId = request.headers.authorizathion
        const incidents = await connection('Incident').where('OngId', OngId).select('*')
        return response.json(incidents)
    },
}