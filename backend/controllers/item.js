const itemsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Item = require('../models/item')
const User = require('../models/user')

// ROUTES

// All items
itemsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({}).populate('user', {username: 1})

  response.json(items)
})

// Get item by ID
itemsRouter.get('/:id', async (request, response) => {
  const item = await Item.findById(request.params.id)

  if (item) {
    response.json(item.toJSON())
  } else {
    response.status(404).end()
  }
})
  
// Add item
itemsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const item = new Item({
    content: body.content,
    done: body.done || false,
    user: user._id
  })

  const savedItem = await item.save()
  user.items = user.items.concat(savedItem._id)
  await user.save()

  response.status(201).json(savedItem)
})
  
// Delete item
itemsRouter.delete('/:id', async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).end()
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