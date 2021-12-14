const mongoose = require('mongoose');
const app = require('./app');


mongoose.connect('mongodb://localhost:27017/migos-shop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(() => {
  console.log('Connected to MongoDB...');
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});