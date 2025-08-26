const mongoose = require('mongoose');

const PropertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  images: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Properties', PropertSchema);
