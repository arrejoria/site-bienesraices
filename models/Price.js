import { DataTypes } from "sequelize";
import db from "../config/db.js";


const Price = db.define('prices', {
    currency: {
        type: DataTypes.JSON,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    price_range: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
})



export default Price;