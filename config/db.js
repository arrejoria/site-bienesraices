import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})


const { DB_NAME, BD_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const db = new Sequelize('bienesraices_database', 'root', DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
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