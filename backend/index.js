const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')
const env = require('dotenv')
env.config();
connectToMongo();
const app = express()
const port = 5000 //port for backend
app.use(cors())
app.use(express.json({ limit: '10mb' }))//middleware required for req.body

app.get('/', (req, res) => { //testing
  res.send('Hello Sutau!')
})
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/jobposting' , require('./routes/jobposting'))
app.use('/api/addskills' , require('./routes/addskills'))
app.use('/api/mlmodels' , require('./routes/MLmodels'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})