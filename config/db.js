import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})


const { DB_NAME, BD_USER, DB_PASS, DB_HOST } = process.env;

const db = new Sequelize('bienesraices_database', BD_USER, DB_PASS, {
    host: DB_HOST,
    port: 3307,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        iddle: 10000
    },
    operatorAliases: false
});

export default db;