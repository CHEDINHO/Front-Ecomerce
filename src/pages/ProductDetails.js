import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data"; // استيراد المنتجات من data.js
import "./../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // استخدم useCallback لتجنب تحذيرات React Hook
  const getSimilarProduct = useCallback((category) => {
    const similarProducts = products.filter(
      (p) => p.category === category && p.slug !== params.slug
    );
    setRelatedProducts(similarProducts);
  }, [params.slug]);

  useEffect(() => {
    if (params?.slug) {
      const productData = products.find((p) => p.slug === params.slug);
      setProduct(productData);
      if (productData) {
        getSimilarProduct(productData.category);
      }
    }
  }, [params?.slug, getSimilarProduct]);

  return (
    <Layout>
      <div className="row container product-details">
        {product ? (
          <>
            <div className="col-md-6">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                height="300"
                width={"350px"}
              />
            </div>
            <div className="col-md-6 product-details-info">
              <h1 className="text-center">Product Details</h1>
              <hr />
              <h6>Name: {product.name}</h6>
              <h6>Description: {product.description}</h6>
              <h6>Price: ${product.price}</h6>
              <h6>Category: {product.category}</h6>
              <button className="btn btn-secondary ms-1">ADD TO CART</button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2>Product not found</h2>
            <p>The product you are looking for does not exist.</p>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        )}
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 ? (
          <p className="text-center">No Similar Products found</p>
        ) : (
          <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div className="card m-2" key={p.id}>
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">${p.price}</h5>
                  </div>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
