exports.up = knex => {
    return knex.schema.createTable('Incident', table => {
        table.increments()
        table.string('Titulo').notNullable()
        table.string('Descricao').notNullable()
        table.double('Valor').notNullable()
        
        table.string('OngId').notNullable()
        table.foreign('OngId').references('Id').inTable('Ong')
    })
}

exports.down = knex => {
    knex.schema.dropTable('Incident')
}