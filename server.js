// =================================================================================
// Dependencies
// =================================================================================
const express = require('express');
const mongoose = require('mongoose'); 
const app = express();
const methodOverride = require('method-override')
require('dotenv').config();


// =================================================================================
// Middleware
// =================================================================================

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));    
app.use(express.static('public'));





// =================================================================================
// Configure Mongoose
// =================================================================================
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// =================================================================================
// Mongodb Event Listeners
// =================================================================================
db.on('error', (error) => console.log(error.message + 'is mongodb not running?'));
db.on('connected', () => console.log('mongodb connected'));
db.on('disconnected', () => console.log('mongodb disconnected'));

// =================================================================================
// Set up Routes/Controllers - I.N.D.U.C.E.S
// =================================================================================

const teasController = require('./controllers/teas');

app.use('/shop', teasController);

// =================================================================================
// Web express 
// =================================================================================
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));