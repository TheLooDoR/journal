const {CLIENT_ORIGIN, PORT}  = require('./config') ;
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
const timeRoutes = require('./routes/time')
const corpRoutes = require('./routes/corp')
const scheduleRoutes = require('./routes/schedule')
const roleRoutes = require('./routes/role')
const positionRoutes = require('./routes/position')
const studentRoutes = require('./routes/student')
const statisticRoutes = require('./routes/statistics')
const weekDayRoutes = require('./routes/weekDay')

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

app.use(cors({
    origin: CLIENT_ORIGIN
}))


app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/subject-types', subjectTypeRoutes)
app.use('/api/journal', journalRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/time', timeRoutes)
app.use('/api/corps', corpRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/positions', positionRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/statistics', statisticRoutes)
app.use('/api/week-days', weekDayRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});