// =================================================================================
// Dependencies
// =================================================================================
const express = require('express');
const mongoose = require('mongoose'); 
const Tea = require('./model/products.js');
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


//Root
// app.get('/', (req, res) => {
//     res.send('Welcome to the Tea Shop!');
// });

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
app.delete('/shop/:id', (req, res) => {
    Tea.splice(req.params.id, 1);
    res.redirect('/shop');
  });


// Update
app.put('/shop/:id', (req, res) => {

    Tea[req.params.id] = req.body;
    res.redirect('/shop');
  });
  


// Create
app.post('/shop', (req, res) => {
    Tea.create(req.body, (error, newTea) => { 
        res.redirect('/shop');
    });
});

// Edit
app.get('/shop/:id/edit', (req, res) => {
	Tea.findById(req.params.id, (error, editTea) => {
        res.render('edit.ejs', {
            tea:editTea
        });
    });
});


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
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));