'use strict';

// Model Associations
import User from './User.js';
import Category from './Category.js';
import { Property, PropertyLocations } from './Property.js';


// Relation from Property to User

Property.belongsTo(User, {foreignKey: 'userId', as: 'owner', onDelete: 'CASCADE' })
Property.belongsTo(Category, {foreignKey: 'categoryId', as: 'category', onDelete: 'CASCADE' })

PropertyLocations.belongsTo(Property, {foreignKey: 'locationId', as: 'location', onDelete: 'CASCADE' })

// Relation of Category to
User.hasMany(Property, {foreignKey: 'userId', as: 'properties', onDelete: 'CASCADE' })






export {
  Property,
  PropertyLocations,
  User,
  Category
}
