const express = require('express')
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth')
const Menu = require('../models/Menu')

const router = express.Router()

// @route    POST api/menu/:restaurantID
// @desc     Add menu to user's restaurant
// @access   Private
router.post('/:restaurantID', auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
