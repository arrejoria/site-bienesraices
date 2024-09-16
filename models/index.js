'use strict';

// Model Associations
import User from './User.js';
import Category from './Category.js';
import { Property, PropertyLocation, PropertyPrice, PropertyImages } from './Property.js';


// Relation of Category and User
User.hasMany(Property, { foreignKey: 'userId', onDelete: 'CASCADE' });
Property.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
 
// Relation of Property and PropertyLocation
Property.belongsTo(PropertyLocation, { foreignKey: 'locationId', onDelete: 'CASCADE' });

// Relation of Property and Category
Property.belongsTo(Category, {foreignKey: 'categoryId', onDelete: 'CASCADE' });

// Relation of PropertyPrice to Property
Property.belongsTo(PropertyPrice, {foreignKey: 'priceId', onDelete: 'CASCADE' });

Property.hasMany(PropertyImages, {foreignKey: 'propId', onDelete: 'CASCADE' })

export {
  Property,
  PropertyLocation,
  PropertyPrice,
  PropertyImages,
  User,
  Category
}
