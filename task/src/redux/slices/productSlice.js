import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 30,
  selectedProduct: null,
  isEditing: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload);
      state.total += 1;
      state.error = null;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.selectedProduct = null;
      state.isEditing = false;
      state.error = null;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(p => p.id !== action.payload);
      state.total -= 1;
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.isEditing = !!action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.isEditing = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  setSelectedProduct,
  clearSelectedProduct,
  clearError 
} = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    if (response.ok) {
      dispatch(fetchProductsSuccess(data));
    } else {
      dispatch(fetchProductsFailure('Failed to fetch products'));
    }
  } catch (error) {
    dispatch(fetchProductsFailure('Network error. Please try again.'));
  }
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch(addProductStart());
  
  try {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(addProductSuccess(data));
    } else {
      dispatch(addProductFailure('Failed to add product'));
    }
  } catch (error) {
    dispatch(addProductFailure('Network error. Please try again.'));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch(updateProductStart());
  
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(updateProductSuccess(data));
    } else {
      dispatch(updateProductFailure('Failed to update product'));
    }
  } catch (error) {
    dispatch(updateProductFailure('Network error. Please try again.'));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(deleteProductStart());
  
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch(deleteProductSuccess(id));
    } else {
      dispatch(deleteProductFailure('Failed to delete product'));
    }
  } catch (error) {
    dispatch(deleteProductFailure('Network error. Please try again.'));
  }
};

export default productSlice.reducer;