exports.up = knex => {
    return knex.schema.createTable('Ong', table => {
        table.string('Id').primary()
        table.string('Nome').notNullable()
        table.string('Email').notNullable()
        table.string('Whatsapp').notNullable()
        table.string('Cidade').notNullable()
        table.string('Uf', 2).notNullable()
    })
}

exports.down = knex => {
    knex.schema.dropTable('Ong')
}
