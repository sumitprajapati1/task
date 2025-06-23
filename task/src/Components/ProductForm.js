import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, clearSelectedProduct } from '../redux/slices/productSlice';
import './ProductForm.css';

function ProductForm() {
  const dispatch = useDispatch();
  const { selectedProduct, isEditing, loading, error } = useSelector((state) => state.products);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || '',
        description: selectedProduct.description || '',
        price: selectedProduct.price || '',
        discountPercentage: selectedProduct.discountPercentage || '',
        rating: selectedProduct.rating || '',
        stock: selectedProduct.stock || '',
        brand: selectedProduct.brand || '',
        category: selectedProduct.category || '',
        thumbnail: selectedProduct.thumbnail || ''
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      discountPercentage: parseFloat(formData.discountPercentage),
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock)
    };

    if (isEditing && selectedProduct) {
      dispatch(updateProduct(selectedProduct.id, productData));
    } else {
      dispatch(addProduct(productData));
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedProduct());
    setFormData({
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      brand: '',
      category: '',
      thumbnail: ''
    });
  };

  return (
    <div className="product-form-container">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="brand">Brand *</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="discountPercentage">Discount %</label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              max="5"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail URL</label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm; 