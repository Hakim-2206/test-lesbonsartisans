import React, {useEffect, useState} from "react";
import {Container, Typography, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ProductForm from "./ProductForm";
import ConfirmDialog from "./ConfirmDialog";
import NotificationSnackbar from "./NotificationSnackbar";

import {useSelector, useDispatch} from "react-redux";
import {
    fetchProducts,
    createProductThunk,
    updateProductThunk,
    deleteProductThunk,
} from "../features/products/productsSlice";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.list);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    const [loadingAction, setLoadingAction] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleSaveProduct = async (productData) => {
        setLoadingAction(true);
        try {
            if (selectedProduct) {
                await dispatch(
                    updateProductThunk({id: selectedProduct._id, data: productData})
                ).unwrap();
                showSnackbar("Product updated successfully.", "success");
            } else {
                await dispatch(createProductThunk(productData)).unwrap();
                showSnackbar("Product created successfully.", "success");
            }
            setIsFormOpen(false);
        } catch (error) {
            showSnackbar("An error occurred, please try again.", "error");
        } finally {
            setLoadingAction(false);
        }
    };

    const openDeleteDialog = (id) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteId(null);
        setIsDeleteDialogOpen(false);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            setLoadingAction(true);
            try {
                await dispatch(deleteProductThunk(deleteId)).unwrap();
                showSnackbar("Product deleted successfully", "success");
            } catch {
                showSnackbar("Failed to delete product", "error");
            } finally {
                setLoadingAction(false);
                closeDeleteDialog();
            }
        }
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({open: true, message, severity});
    };

    const closeSnackbar = () => {
        setSnackbar((prev) => ({...prev, open: false}));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{mt: 4}}>
                Product List
            </Typography>

            {error && (
                <Typography color={"error"} gutterBottom>
                    {error}
                </Typography>
            )}

            {status === "loading" && <Typography>Loading products...</Typography>}
            {status === "failed" && (
                <Typography color="error">Failed to load products: {error}</Typography>
            )}
            {status === "succeeded" && products.length === 0 && (
                <Typography>No products available.</Typography>
            )}

            <Grid container spacing={2} sx={{width: "100%"}}>
                {status === "succeeded" &&
                    products.map(
                        (product, index) =>
                            product && (
                                <Grid key={product._id || index} size={{xs: 12, sm: 6, md: 4}}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography>Type: {product.type}</Typography>
                                            <Typography>Price: {product.price} €</Typography>
                                            <Typography>Rating: {product.rating} / 5</Typography>
                                            <Typography>
                                                Warranty: {product.warranty_years} year(s)
                                            </Typography>
                                            <Typography>
                                                Available: {product.available ? "Yes" : "No"}
                                            </Typography>
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setIsFormOpen(true);
                                                }}
                                                sx={{mt: 1}}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => openDeleteDialog(product._id)}
                                                sx={{mt: 1, ml: 1}}
                                            >
                                                Delete
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                    )}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setSelectedProduct(null);
                    setIsFormOpen(true);
                }}
                sx={{mb: 2, mt: 4}}
            >
                + Add Product
            </Button>

            <ProductForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveProduct}
                initialData={selectedProduct}
                loading={loadingAction}
                setLoading={setLoadingAction}
            />

            <ConfirmDialog
                open={isDeleteDialogOpen}
                title="Confirm Delete"
                content="Are you sure you want to delete this product?"
                onCancel={closeDeleteDialog}
                onConfirm={confirmDelete}
                confirmColor="error"
            />

            <NotificationSnackbar
                open={snackbar.open}
                onClose={closeSnackbar}
                severity={snackbar.severity}
                message={snackbar.message}
            />
        </Container>
    );
};

export default ProductList;
