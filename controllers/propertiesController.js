import { validationResult } from 'express-validator'
import Category from '../models/Category.js'


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


    return res.render('properties/create', {
        pageTitle: 'Crear propiedad',
        nonce: req.csrfToken()
    })
}

export {
    admin,
    createProperty,
    save
}