const API_BASE = "/api/products";

const handleResponse = async (res) => {
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || `HTTP error! status: ${res.status}`);
    }
    return res.json();
};

export const fetchProducts = () => fetch(API_BASE).then(handleResponse);

export const createProduct = (productData) =>
    fetch(API_BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(productData),
    }).then(handleResponse);

export const updateProduct = (id, productData) =>
    fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(productData),
    }).then(handleResponse);

export const deleteProduct = (id) =>
    fetch(`${API_BASE}/${id}`, {method: "DELETE"}).then((res) => {
        if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);
        return true; // ou res.json() si API renvoie un contenu
    });
