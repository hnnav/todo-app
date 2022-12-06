const itemsRouter = require('express').Router()
const Item = require('../models/item')
const User = require('../models/user')

// ROUTES

// All items
itemsRouter.get('/', (request, response) => {
    Item.find({}).then(items => {
      response.json(items)
    })
})
  
// Add item
itemsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const item = new Item({
      content: body.content,
      done: body.done || false,
      user: user.id
    })

    const savedItem = await item.save()
    user.items = user.items.concat(savedItem._id)
    await user.save()
    
    response.json(savedItem)
})
  
// Delete item
itemsRouter.delete('/:id', (request, response, next) => {
    Item.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

// Update item (done / not done)
itemsRouter.put('/:id', (request, response, next) => {
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
  
module.exports = itemsRouter;