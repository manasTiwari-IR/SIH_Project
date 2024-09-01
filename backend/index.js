const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000 //port for backend
app.use(cors())
app.use(express.json({ limit: '10mb' }))//middleware required for req.body

app.get('/', (req, res) => { //testing
  res.send('Hello Sutau!')
})
// app.use('/api/auth' , require('./routes/auth')) //for login/signup etc

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})