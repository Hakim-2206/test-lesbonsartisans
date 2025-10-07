import React, {useState, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem, CircularProgress} from '@mui/material';

const ProductForm = ({open, onClose, onSave, initialData, loading, setLoading}) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [warrantyYears, setWarrantyYears] = useState('');
    const [available, setAvailable] = useState(true);

    const [errors, setErrors] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setType(initialData.type || '');
            setPrice(initialData.price !== undefined ? initialData.price.toString() : '');
            setRating(initialData.rating !== undefined ? initialData.rating.toString() : '');
            setWarrantyYears(initialData.warranty_years !== undefined ? initialData.warranty_years.toString() : '');
            setAvailable(initialData.available !== undefined ? initialData.available : true);
        } else {
            setName('');
            setType('');
            setPrice('');
            setRating('');
            setWarrantyYears('');
            setAvailable(true);
        }
        setErrors({})
        setIsDirty(false)
    }, [initialData, open]);

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is Required';
        if (!type.trim()) newErrors.type = 'Type is Required';

        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum < 0) newErrors.price = 'Price must be a positive number';

        const ratingNum = parseFloat(rating);
        if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) newErrors.rating = 'Rating must be between 0 and 5';

        const warrantyNum = parseInt(warrantyYears);
        if (isNaN(warrantyNum) || warrantyNum < 0) newErrors.warrantyYears = 'Warranty years must be positive integer';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        if (!isDirty) return; // on soumet pas si y'a pas de modification

        const productData = {
            name,
            type,
            price: parseFloat(price),
            rating: parseFloat(rating),
            warranty_years: parseInt(warrantyYears),
            available,
        };
        onSave(productData);
    };

    // gestionnaire onChange
    const handleChange = (setter) => (e) => {
        setter(e.target.value === 'checkbox' ? e.target.checked : e.target.value);
        if (!isDirty) setIsDirty(true);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    value={name}
                    onChange={handleChange(setName)}
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    disabled={loading}
                />
                <TextField
                    label="Type"
                    value={type}
                    onChange={handleChange(setType)}
                    fullWidth
                    margin="normal"
                    error={!!errors.type}
                    helperText={errors.type}
                    required
                    disabled={loading}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={handleChange(setPrice)}
                    fullWidth
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price}
                    inputProps={{min: 0, step: 0.01}}
                    required
                    disabled={loading}
                />
                <TextField
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={handleChange(setRating)}
                    fullWidth
                    margin="normal"
                    error={!!errors.rating}
                    helperText={errors.rating}
                    required
                    inputProps={{min: 0, max: 5, step: 0.1}}
                    disabled={loading}
                />
                <TextField
                    label="Warranty Years"
                    type="number"
                    value={warrantyYears}
                    onChange={handleChange(setWarrantyYears)}
                    fullWidth
                    margin="normal"
                    error={!!errors.warrantyYears}
                    helperText={errors.warrantyYears}
                    required
                    inputProps={{min: 0, step: 1}}
                    disabled={loading}
                />
                <TextField
                    label="Available"
                    select
                    value={available}
                    onChange={handleChange((val) => setAvailable(val === 'true'))}
                    fullWidth
                    margin="normal"
                    disabled={loading}
                >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </TextField>
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{marginTop: '1em'}}
                        disabled={loading || !isDirty}>
                    {loading ? <CircularProgress size={24}/> : 'Save'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProductForm;
