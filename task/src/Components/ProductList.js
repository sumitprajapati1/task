import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, setSelectedProduct } from '../redux/slices/productSlice';
import { logout } from '../redux/slices/authSlice';
import ProductForm from './ProductForm';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error, total, isEditing } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    dispatch(setSelectedProduct(product));
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (loading && products.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchProducts())} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <header className="product-header">
        <div className="header-content">
          <h1>Product Management</h1>
          <div className="user-info">
            <span>Welcome, {user?.firstName} {user?.lastName}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        <div className="product-stats">
          <p>Total Products: {total}</p>
          <p>Showing: {products.length} products</p>
          <button onClick={handleAddProduct} className="add-product-btn">
            + Add New Product
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <button className="close-btn" onClick={handleCloseForm}>×</button>
            <ProductForm />
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="product-image"
                  />
                </td>
                <td className="product-title">{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.discountPercentage}%</td>
                <td>
                  <span className="rating">
                    {product.rating} ⭐
                  </span>
                </td>
                <td>
                  <span className={`stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="actions">
                  <button 
                    onClick={() => handleEditProduct(product)}
                    className="edit-btn"
                    title="Edit Product"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-btn"
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;