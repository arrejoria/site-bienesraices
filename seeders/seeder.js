import { exit } from 'node:process'
import { Sequelize } from 'sequelize'
import { Category, Property, PropertyLocation, PropertyPrice, User } from '../models/index.js'
import categories from './categories.js'
import prices from './prices.js'
import users from './users.js'
import locations from './locations.js'
import db from '../config/db.js'

const importData = async () => {
        try {

        // Authenticate
        await db.authenticate()

        // Create Columns
        await db.sync()

        // Insert data
        await Promise.all([
            PropertyPrice.bulkCreate(prices),
            PropertyLocation.bulkCreate(locations),
            Category.bulkCreate(categories),
            User.bulkCreate(users)
        ])
        console.log('Datos importados correctamente');
        
        exit()
    } catch (error) {
        console.log(error);
        exit(1)
    }
}

if(process.argv[2] === '-i'){
    importData()
}

const deleteData = async () => {
        
    // Primero elimina la tabla properties
    await Property.destroy({ where: {} });
    try {

        db.authenticate()

        await Promise.all([
            PropertyLocation.destroy({where:{}}),
            PropertyPrice.destroy({where:{}}),
            Category.destroy({where:{}}),
        ])

        await db.sync({force: true})

        console.log('Datos eliminados correctamente');
        exit()
    } catch (error) {
        console.log(error);
        exit(1)
    }
}

if(process.argv[2] === '-d'){
    deleteData()
}