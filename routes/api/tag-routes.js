const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include:[
      {
        model: Product,
        through: ProductTag,
        as:'tagged_products'
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// find a single tag by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include:[
      {
        model: Product,
        through: ProductTag,
        as: 'tagged_products'
      }
    ]
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(400).json({message: "No tag found with that id."});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body,{
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    tag_name: req.body.tag_name,
    where:{
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(400).json({message: "No tag found with that id."});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
