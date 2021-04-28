const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')
const fileUpload = require('express-fileupload')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://keshavaa:mlhhackathon@cluster0.yybsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    , {useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

app.use('/api/users', require('./routes/api/users'))
app.use('/api', require('./routes/api/item'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on Port ${port}`))