const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },

    description: {
      type: String,
      unique: true,
      required: true,
    },

    img: {
      type: String,
      required: true,
    },

    categories: {
      type: String,
      required: true,
    },

    size: String,

    color: String,

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
