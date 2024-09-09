import { validationResult } from 'express-validator'
import {User, Property, PropertyPrice, Category, PropertyLocation} from '../models/index.js'
import { Sequelize } from 'sequelize'
import db from '../config/db.js'

const admin = (req, res) => {

    res.render("properties/admin", {
        pageTitle: "Admin Page",
        menu: true
    })
}


const createProperty = async (req, res) => {

    // Retrieve Category table data
    const categories = await Category.findAll();


    return res.render('properties/create', {
        pageTitle: 'Crear propiedad',
        categories,
        nonce: req.csrfToken(),
        data: {}
    })
}

const save = async (req,res) => {
    
    // Validations
    let valResults = validationResult(req)
    
    if(!valResults.isEmpty()){

    // Retrieve Category table data
        const categories = await Category.findAll();

        return res.render('properties/create', {
            pageTitle: 'Crear propiedad',
            categories,
            errors: valResults.mapped(),
            data: req.body,
            nonce: req.csrfToken()
        })
    }

    // Destructuring req.body and req.user
    const { prop_title, description, rooms, bathrooms, bedrooms, garage, elevator, terrace, images, category: categoryId, currency, amount, street, lat, lng } = req.body;
    // const { id } = req.user
    const t = await db.transaction(); // iniciar transaction
    
    console.log(req.user);
    
    try {
    // Handle currency and amount Prices data
    const [price] = await PropertyPrice.findOrCreate({
        where: { currency, amount },
        defaults: { currency, amount },
        transaction: t
    });
    // Handle location property data
    const [location] = await PropertyLocation.findOrCreate({
        where: { street, lat, lng },
        defaults: { street, lat, lng },
        transaction: t
    });

    //Handle Optional fields data
    const isElevator = elevator === '1'
    const isTerrace = terrace === '1'
    const isGarage = garage === '1'

    const propertyCreate = await Property.create({
        prop_title,
        description,
        rooms,
        bathrooms,
        bedrooms,
        elevator: isElevator, // Asignar null si no se seleccionó
        terrace: isTerrace,
        garage: isGarage,
        priceId: price.id, // Asocia el id del precio creado o encontrado
        userId: 1,
        locationId: location.id,
        categoryId,
        image: ''
    }, { transaction: t})

    await t.commit()
    console.log('transaction commited');

    res.render('properties/create', {
        pageTitle: 'Crear propiedad',
        nonce: req.csrfToken()
    })
    
    } catch (error) {
        console.error('Error: ' + error);

        await t.rollback();
        res.status(500).json({ message: 'Error creating property' });
    }
}

export {
    admin,
    createProperty,
    save
}