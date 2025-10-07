const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET pour tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET pour produit par ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: 'Produit non trouvé'});
        res.json(product);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// POST créer un produit
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();

        const io = req.app.locals.io;
        io.emit('productCreated', newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

// PUT modifier un produit
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedProduct) return res.status(404).json({message: 'Produit non trouvé'});

        const io = req.app.locals.io;
        io.emit('productUpdated', updatedProduct);

        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// DELETE supprimer un produit
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({message: 'Produit non trouvé'});

        const io = req.app.locals.io;
        io.emit('productDeleted', {_id: req.params.id});

        res.json({message: 'Produit supprimé'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


module.exports = router;