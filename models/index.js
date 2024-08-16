// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  OnUpdate: 'CASCADE',
  onDelete: 'SET NULL',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',  
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'tag_id',
  otherKey: 'product_id',
  through: ProductTag,
  as: 'Product',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
   foreignKey: 'product_id',
   otherKey: 'tag_id',
   through: ProductTag,
   as: 'Tag',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
