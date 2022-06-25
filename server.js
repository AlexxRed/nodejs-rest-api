const app = require('./app')
// const process = require('process');
const mongoose = require('mongoose');
const { DB_HOST } = process.env


mongoose.connect(DB_HOST)
  .then(()=>console.log("Database connection successful"))
  .catch(error => { 
    console.log(error.message);
    process.exit(1)
  })
  

app.listen(3333, () => {
  console.log("Server running. Use our API on port: 3333")
})
