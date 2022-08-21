const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include:[
      {
        model: Product
      }
    ]
  })
  .then(dbCategoryData => {res.json(dbCategoryData)})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// find one category by id
router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id: req.params.id
    },
    include:[
      {
        model: Product
      }
    ]
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(400).json({message:"No category found with that id."});
      return;
    }
    res.json(dbCategoryData);
  })
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
