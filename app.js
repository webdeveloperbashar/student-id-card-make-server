const express = require('express')
const app = express()
const cors = require("cors")
const port = 4000
const studentRouter = require('./routers/studentsRouter')
const mongoose = require("mongoose");
app.use(cors())
app.use(express.json());
require("dotenv").config();
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oss1b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use('/api/students', studentRouter);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port, () => {
    console.log(`Server started on ${port}`);
  }))
  .catch((error) => console.log(error));


