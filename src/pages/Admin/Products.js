import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { products as dataProducts } from "../../data"; // استيراد البيانات المحلية
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // استخدام useEffect لتعيين المنتجات عند تحميل المكون
  useEffect(() => {
    setProducts(dataProducts); // تعيين المنتجات من البيانات المحلية
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p.id} // استخدام id بدلاً من _id
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={p.image} // استخدام الصورة من البيانات المحلية
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
