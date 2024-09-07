import { exit } from 'node:process'
import categories from './categories.js'
import prices from './prices.js'
import { Category } from '../models/index.js'
import db from '../config/db.js'
import { truncate } from 'node:fs'

const importData = async () => {
        try {

        // Authenticate
        await db.authenticate()

        // Create Columns
        await db.sync()

        // Insert data
        await Category.bulkCreate(categories)
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
    try {
        await Promise.all([
            Category.destroy({where:{}, truncate: true}),
        ])
    } catch (error) {
        console.log(error);
        exit(1)
    }
}

if(process.argv[2] === '-d'){
    deleteData()
}