const fs = require('fs');
const mongoose = require('mongoose');
const Migos = require('../../model/migosModel');


mongoose.connect('mongodb://localhost:27017/migos-shop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(() => {
  console.log('Connected to MongoDB...');
});


// READ JSON FILE
const migos = JSON.parse(fs.readFileSync(`${__dirname}/migos-simple.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
    try {
      await Migos.create(migos);
      console.log('Data successfully loaded!');
      process.exit();
    } catch(err) {
      console.log(err);
    }
};

const deleteData = async () => {
    try {
     await Migos.deleteMany(migos);
     console.log('Data successfully deleted!');
     process.exit();
    } catch(err) {
      console.log(err);
    }
}


if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
