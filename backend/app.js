const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport');
const userRoutes = require('./routes/user')

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

//Database
const db = require('./db/database')

//TestDb
db.authenticate()
    .then(() => console.log('======DATABASE CONNECTED======'))
    .catch(err => console.log('Error ' + err))

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});