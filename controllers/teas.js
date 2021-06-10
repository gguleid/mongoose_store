const express = require('express');
const teaRouter = express.Router();
const Tea = require('../model/products');


// Seed
const teaSeed = require('../model/teaSeed.js');
teaRouter.get('/shop/seed', (req, res) => {
	Tea.deleteMany({}, (error, allTeas) => {})
	Tea.create(teaSeed, (error, data) => {
		res.redirect('/shop')
	})
})


// Index
teaRouter.get('/', (req, res) => {
    Tea.find({}, (error, allTeas) => {
        res.render('index.ejs', {
            teas: allTeas,
        });
    });
});


// New
teaRouter.get('/new', (req, res) => {
    res.render('new.ejs');
});


// Delete
teaRouter.delete('/:id', (req, res) => {
    Tea.findByIdAndDelete(req.params.id, (error, deletedBook) => {
        res.redirect('/shop');
    });
});


// Update Buy Button 
teaRouter.put('/:id/buy', (req, res) =>{
    Tea.findOneAndUpdate(req.params.id, {new:true}, {
        $inc: { 
            // https://docs.mongodb.com/manual/reference/operator/update/inc/)
            "tea.qty": -1,
            },
        
    })
    res.redirect(`/shop/${req.params.id}`);

});


// Update
teaRouter.put('/:id', (req, res) => {

    Tea.findByIdAndUpdate(req.params.id, req.body, (error, updatedBook) => {
        res.redirect(`/shop/${req.params.id}`)
    });
});


// Create
teaRouter.post('/shop', (req, res) => {
    Tea.create(req.body, (error, newTea) => { 
        res.redirect('/shop');
    });
});
// Edit
teaRouter.get('/:id/edit', (req, res) => {
	Tea.findById(req.params.id, (error, foundTea) => {
        res.render('edit.ejs', {
            tea:foundTea
        });
    });
});


// Show
teaRouter.get('/:id', (req, res) => {
    Tea.findById(req.params.id, (error, foundTea) => {
        res.render('show.ejs', {
            tea: foundTea
        })
    })
})



module.exports = teaRouter;