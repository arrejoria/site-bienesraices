import { DataTypes } from "sequelize";
import db from '../config/db.js'


const Property = db.define('properties', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    prop_title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    elevator: {
        type: DataTypes.BOOLEAN,
    },
    terrace: {
        type: DataTypes.BOOLEAN,
    },
    garage: {
        type: DataTypes.BOOLEAN,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

const PropertyLocation = db.define('prop_locations', {
    street: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

const PropertyPrice = db.define('prop_prices', {
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    }
})

export {
    Property,
    PropertyLocation,
    PropertyPrice
};