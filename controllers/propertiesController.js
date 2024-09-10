import { validationResult } from 'express-validator'
import {User, Property, PropertyPrice, Category, PropertyLocation} from '../models/index.js'
import { Sequelize } from 'sequelize'
import db from '../config/db.js'

const admin = (req, res) => {

    res.render("properties/admin", {
        pageTitle: "Administración de Propiedades"
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

    const t = await db.transaction(); // iniciar transaction
    
    try {
    // Destructuring req.body with property form values
    const { prop_title, description, rooms, bathrooms, bedrooms, garage, elevator, terrace, images, category: categoryId, currency, amount, street, lat, lng } = req.body;

    // Handle currency and amount Prices data
    const prices = await PropertyPrice.create({ 
        currency,
        amount
    }, { transaction: t});

    // Handle location property data
    const locations = await PropertyLocation.create({
        street,
        lat,
        lng
    }, { transaction: t});

    //Handle Optional fields data: if value is equal then set as a truthy value
    const isElevator = elevator === '1'
    const isTerrace = terrace === '1'
    const isGarage = garage === '1'

    // Get UserId from req.user
    const { id: userId } = req.user
    //Insert property record in properties
    const saveProperty = await Property.create({
        prop_title,
        description,
        rooms,
        bathrooms,
        bedrooms,
        elevator: isElevator,
        terrace: isTerrace,
        garage: isGarage,
        priceId: prices.id,
        userId,
        locationId: locations.id,
        categoryId,
        image: ''
    }, { transaction: t})

    
    await t.commit()

    const { id:propId } = saveProperty

    res.redirect(`/properties/add-images/${propId}`)

    
    } catch (error) {
        console.error('Error: ' + error);
        const categories = await Category.findAll();

        await t.rollback();

        return res.render('properties/create', {
            pageTitle: 'Crear propiedad',
            categories,
            errors: [{catchMsg: 'Hubo un error al crear la propiedad'}],
            data: req.body,
            nonce: req.csrfToken()
        })
    }
}

const addImages = async (req, res) => {
    console.log('Adding images');

    res.render('properties/add-images',{
        pageTitle: 'Agregar imagen de propiedad'
    })
}

const saveImages = async (req, res) => {

}

export {
    admin,
    createProperty,
    save,
    addImages,
    saveImages
}