// =================================================================================
// Dependencies
// =================================================================================
const express = require('express');
const mongoose = require('mongoose'); 
const Tea = require('./model/products.js');
const app = express();



// =================================================================================
// Middleware
// =================================================================================

app.use(express.urlencoded({extended: false}));


// =================================================================================
// Configure Mongoose
// =================================================================================


const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})


// =================================================================================
// Mongodb Event Listeners
// =================================================================================
db.on('error', (error) => console.log(error.message + 'is mongodb not running?'));
db.on('connected', () => console.log('mongodb connected'));
db.on('disconnected', () => console.log('mongodb disconnected'));

// =================================================================================
// Set up Routes/Controllers - I.N.D.U.C.E.S
// =================================================================================

// Seed
const teaSeed = require('./model/teaSeed.js');
app.get('/shop/seed', (req, res) => {
	Tea.deleteMany({}, (error, allTeas) => {})
	Tea.create(teaSeed, (error, data) => {
		res.redirect('/shop')
	})
})

// Index
app.get('/shop', (req, res) => {
    Tea.find({}, (error, allTeas) => {
        res.render('index.ejs', {
            teas: allTeas,
        });
    });
});


// New
app.get('/shop/new', (req, res) => {
    res.render('new.ejs');
});


// Delete



// Update 



// Create
app.post('/shop', (req, res) => {
    Tea.create(req.body, (error, newTea) => { //call back is a status update from mongoose
        res.redirect('/shop');
    });
});

// Edit


// Show
app.get('/shop/:id', (req, res) => {
    Tea.findById(req.params.id, (error, foundTea) => {
        res.render('show.ejs', {
            tea: foundTea
        })
    })
})















// =================================================================================
// Web express 
// =================================================================================
app.listen(port, () => console.log(`express is listening on port: ${port}`));