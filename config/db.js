import Sequelize from 'sequelize'

const db = new Sequelize('bienes_raices', 'root', '', {
    host: 'localhost',
    port: 3307,
    dialec: 'mysql2'
})