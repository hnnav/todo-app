const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('items')

  response.json(users)
})

// CREATE user
usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'User already exists'
    })
  }

  if (password.length === 0 || username.length === 0) {
    return response.status(400).json({
      error: "Username or password can't be blank"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()
  console.log(savedUser)
  response.status(201).json(savedUser)
})

// DELETE user
usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter