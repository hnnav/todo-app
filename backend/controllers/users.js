const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// ROUTES

// GET All users
usersRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

// POST (Create user)
usersRouter.post('/', (request, response, next) => {
  const body = request.body
  const user = new User({
    username: body.username,
    email: body.email,
    password: body.password
  })
  user.save()
    .then(savedUser => {
      response.json(savedUser)
    })
    .catch(error => next(error))
})

// Login (find user)
usersRouter.get("/:id", async (request, response) => {
  const user = await User.findOne({
    username: request.body.username,
    password: request.body.password
  });
  if (user) {
    response.json(user.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = usersRouter