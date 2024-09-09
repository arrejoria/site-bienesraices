import { DataTypes } from "sequelize";
import db from "../config/db.js";


const Category = db.define('prop_categories', {
    name: { 
        type: DataTypes.STRING(60),
        allowNull: false
    }
})



export default Category;