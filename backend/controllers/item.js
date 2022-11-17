const express = require('express');
const router = express.Router();
const Item = require('../models/item.js')

// ROUTES

// All items
router.get('/', (request, response) => {
    Item.find({}).then(items => {
      response.json(items)
    })
})
  
// Add item
router.post('/', (request, response, next) => {
    const body = request.body
    const item = new Item({
      content: body.content,
      done: body.done || false,
    })
    item.save()
      .then(savedItem => {
        response.json(savedItem)
      })
      .catch(error => next(error))
})
  
// Delete item
router.delete('/:id', (request, response, next) => {
    Item.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

// Update item (done / not done)
router.put('/:id', (request, response, next) => {
    const body = request.body
    const item = {
      done: body.done,
    }
    Item.findByIdAndUpdate(request.params.id, item, { new: true })
      .then(updatedItem => {
        response.json(updatedItem)
      })
      .catch(error => next(error))
})
  
module.exports = router;