const express = require('express')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Restaurant = require('../models/Restaurant')
const auth = require('../middleware/auth')

const router = express.Router()

// @route    POST api/restaurant/:userID
// @desc     Post new restaurant
// @access   Private
router.post('/:userID', auth, async (req, res) => {
  try {
    const { name, phone, address } = req.body
    let restaurant = new Restaurant({
      name,
      phone,
      address,
    })

    await restaurant.save()
    res.status(200).json(restaurant)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
