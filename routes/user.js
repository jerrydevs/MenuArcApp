const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const _ = require('lodash')

const auth = require('../middleware/auth')
const User = require('../models/User')

const router = express.Router()

// @route    POST api/users
// @desc     Register a user
// @access   Public
// Header body: JSON { "name": '', "email": '', "password": '' }
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      let user

      // Will contain above errors if there are any
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      // Check if user with email already exists
      const { username, name, email, password } = req.body
      user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'A user with that email already exists.' })
      }

      user = new User({
        email,
        password,
      })

      // Encrypt user password before storing into DB
      const salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const userData = {
        user: {
          id: user.id,
        },
      }

      // Return jwt token, expiration in 1hr
      const tokenSecret = config.has('tokenSecret')
        ? config.get('tokenSecret')
        : 'mytemporarysecret'
      jwt.sign(userData, tokenSecret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  },
)

// @route    DELETE api/users
// @desc     Delete a user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User Deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/users
// @desc     Get all users
// @access   Public
// USED FOR TESTING PURPOSES ONLY
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
