const connection = require('../database/connection')

module.exports = {
    async create (request, response) {
        const { Titulo, Descricao, Valor } = request.body
        const OngId = request.headers.authorization
        const [id] = await connection('Incident').insert({
            Titulo,
            Descricao,
            Valor,
            OngId
        })
        return response.json({ id })
    },
    async index (request, response) {
        const { page = 1 } = request.query
        const [ count ] = await connection('Incident').count()
        response.header('X-Total-Count', count['count(*)'])
        
        const incidents = await connection('Incident')
        .join('Ong', 'Ong.Id', '=', 'Incident.OngId')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['Incident.*',
        'Ong.Nome',
        'Ong.Email',
        'Ong.Whatsapp',
        'Ong.Cidade',
        'Ong.Uf',])
        
        return response.json(incidents)
    },
    async delete (request, response) {
        const { id } = request.params
        const OngId = request.headers.authorization

        const incident = await connection('Incident').where('id', id).select('OngId').first()
        if (incident.OngId !== OngId) return response.status(401).json({ error: 'Not Permited' })
        await connection('Incident').where('id', id).delete()
        return response.status(204).send()
    }
}