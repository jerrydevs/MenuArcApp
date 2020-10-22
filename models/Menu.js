const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      // 'appetizer', 'drink', 'main', etc.
      type: {
        type: String,
      },
    },
  ],
})

module.exports = mongoose.model('Menu', MenuSchema)
