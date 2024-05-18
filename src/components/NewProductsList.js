import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

const fetchProductsGet = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('failed');
  }
  return response.json();
};

const AddProductFormNew = () => {
  const [productNameAdd, setProductNameAdd] = useState('');
  const [descriptionNewAdd, setDescriptionNewAdd] = useState('');
  const [priceNewPrice, setPriceNewPrice] = useState('');

  const queryClientAddOne = useQueryClient();

  const addProductMutationNewAdd = useMutation(
    (newProductData) => {
      return fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });
    },
    {
      onSuccess: () => {
        queryClientAddOne.invalidateQueries('products');
        setProductNameAdd('');
        setDescriptionNewAdd('');
        setPriceNewPrice('');
      },
    }
  );

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const newProductData = {
      title: productNameAdd,
      descriptionNewAdd,
      priceNewPrice: parseFloat(priceNewPrice),
    };

    addProductMutationNewAdd.mutate(newProductData);
    console.log('Add New data:', newProductData);

  };

  return (
    <div className='container mt-5'>
      <Link to='/'>
        <div className="container">
          <button type="button" className='mt-1 btn btn-success m-2' >Back to Home</button>

        </div>
      </Link>
      <h2 className='m-3'>Add Products</h2>
      <form onSubmit={handleSubmitAdd}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Product Name:</label>
            <input className="form-control" type="text"
              id="productName"
              value={productNameAdd}
              onChange={(e) => setProductNameAdd(e.target.value)} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Price:</label>
            <input className="form-control" type="number"
              id="price"
              value={priceNewPrice}
              onChange={(e) => setPriceNewPrice(e.target.value)} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Description:</label>
          <textarea type="text" className="form-control" id="description"
            value={descriptionNewAdd}
            onChange={(e) => setDescriptionNewAdd(e.target.value)} required />
        </div>

        <button type="submit" className='m-2' disabled={addProductMutationNewAdd.isLoading}>
          {addProductMutationNewAdd.isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>

  );
};

const ProductsListShow = () => {
  const { data: responseData, isLoading, isError } = useQuery('products', fetchProductsGet);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching products</div>;
  }
  const products = responseData.products;
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className='container'>

      <h2 className='m-3'>Products List</h2>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">SN.</th>
            <th scope="col">Phone Brand Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th scope="row">{index + 1}</th>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProductApp = () => {
  return (
    <div>
      <AddProductFormNew />
      <ProductsListShow />
    </div>
  );
};

export default ProductApp;
