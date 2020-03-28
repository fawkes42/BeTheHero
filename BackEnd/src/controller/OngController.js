const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
    async create(request, response) {
        const { Nome, Email, Whatsapp, Cidade, Uf } = request.body
        const Id = crypto.randomBytes(4).toString('HEX')

        await connection ('Ong').insert({
            Id,
            Nome,
            Email,
            Whatsapp,
            Cidade,
            Uf
        })
        return response.json({ Id })
    },
    async index (request, response) {
        const ongs = await connection('Ong').select('*')
        return response.json(ongs)
    }
}