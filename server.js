const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');
const path = require('path')

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect('mongodb+srv://keshavaa:mlhhackathon@cluster0.yybsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    , {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

app.use('/api/users', require('./routes/api/users'))
app.use('/api', require('./routes/api/item'))

if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on Port ${port}`))