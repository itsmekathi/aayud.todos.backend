const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
var cors = require('cors')
const mongoose = require('mongoose');

mongoose.connect(config.get('connectionString'))
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.error('Error connecting to mongodb', err));

const todos = require('./routes/todos');
const home = require('./routes/home');

const express = require('express')
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
// Enable morgan when in development mode
if (app.get('env') == 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}
app.use(logger);
app.use(auth);
app.use('/api/todos', todos);
app.use('/', home);


// Fetch application configuration
console.log(`Application is running in ${app.get('env')} mode`);
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail server: ${config.get('mail.host')}`);
console.log(`Mail server password: ${config.get('mail.password')}`);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})