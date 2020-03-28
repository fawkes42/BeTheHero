const connection = require('../database/connection')

module.exports = {
    async create (request, response) {
        const { Id } = request.body
        const Ong = await connection('Ong').where('Id', Id).select('Nome').first()
        if(!Ong) return response.status(400).json({ error: 'No Ong found with this Id' })
        return response.json(Ong)
    }
}