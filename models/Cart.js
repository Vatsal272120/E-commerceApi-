const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
