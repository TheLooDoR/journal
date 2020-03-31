const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport');

const userRoutes = require('./routes/user')
const groupRoutes = require('./routes/group')
const subjectRoutes = require('./routes/subject')
const subjectTypeRoutes = require('./routes/subjectType')
const journalRoutes = require('./routes/journal')
const departmentRoutes = require('./routes/department')

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



const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/subject-types', subjectTypeRoutes)
app.use('/api/journal', journalRoutes)
app.use('/api/departments', departmentRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});