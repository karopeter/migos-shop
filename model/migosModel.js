const mongoose = require('mongoose');

const migosSchema = new mongoose.Schema({
   name: {
     type: String,
     required: [true, 'A migos must have a name'],
     unique: true,
     trim: true
   },
   price: {
     type: Number,
     required: [true, 'A migos must have a price']
   },
   imageCover: {
     type: String,
     type: String,
     required: [true, 'A migos must have a cover image']
   }
});


const Migos = mongoose.model('Migos', migosSchema);

module.exports = Migos;