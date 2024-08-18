const router = require('express').Router();
const { Category, Product } = require('../../models');
const seedCategories = require('../../seeds/category-seeds');
const seedProducts = require('../../seeds/product-seeds');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
  // include Products
    include: [{ model: Product }],
  });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
      });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No Category with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  } 
 Category.update(
   {
     // All the fields you can update and the data attached to the request body.
     category_name: req.body.category_name,
   },
   {
     // Gets a category based on the category_id given in the request parameters
     where: {
       category_id: req.params.category_id,
     },
   }
 )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
