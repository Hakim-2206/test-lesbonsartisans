import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as productService from '../../services/productService';

// Thunk pour charger tous les produits avec gestion d'erreur
export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, {rejectWithValue}) => {
    try {
        const products = await productService.fetchProducts();
        return products;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Thunk pour créer un produit avec gestion d'erreur
export const createProductThunk = createAsyncThunk('products/create', async (newProduct, {rejectWithValue}) => {
    try {
        const createdProduct = await productService.createProduct(newProduct);
        return createdProduct;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Thunk pour mettre à jour un produit avec gestion d'erreur
export const updateProductThunk = createAsyncThunk('products/update', async ({id, data}, {rejectWithValue}) => {
    try {
        const updatedProduct = await productService.updateProduct(id, data);
        return updatedProduct;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Thunk pour supprimer un produit avec gestion d'erreur
export const deleteProductThunk = createAsyncThunk('products/delete', async (id, {rejectWithValue}) => {
    try {
        await productService.deleteProduct(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchProducts cases
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })

            // createProductThunk cases
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })

            // updateProductThunk cases
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                const index = state.list.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })

            // deleteProductThunk cases
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p._id !== action.payload);
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export default productsSlice.reducer;
