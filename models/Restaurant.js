const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)
