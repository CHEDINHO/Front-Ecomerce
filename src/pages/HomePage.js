import React, { useState, useEffect, useCallback } from "react"; // استيراد useCallback
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { products as dataProducts } from "../data"; // استيراد المنتجات من data.js
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import "../styles/Homepage.css"; // تم حذف AiOutlineReload

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState(dataProducts); // تعيين المنتجات من data.js
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // الحصول على جميع الفئات
  const getAllCategory = () => {
    const uniqueCategories = Array.from(new Set(dataProducts.map(p => p.category)));
    setCategories(uniqueCategories.map(cat => ({ _id: cat, name: cat })));
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // الفلترة حسب الفئة
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
 
  // دالة لفلترة المنتجات
  const filterProduct = useCallback(() => {
    const filteredProducts = dataProducts.filter(product =>
      checked.includes(product.category) || radio.includes(product.price)
    );
    setProducts(filteredProducts);
  }, [checked, radio]); // إضافة checked و radio كتبعيات

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else setProducts(dataProducts); // إعادة تعيين المنتجات إذا لم يكن هناك فلترة
  }, [checked, radio, filterProduct]); // إضافة filterProduct كـ dependency

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Our Products</h1> {/* عنوان جديد */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={p.image} // استخدم الصورة مباشرة من البيانات
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)} // تم إصلاح هنا باستخدام backticks
                    >
                    More Details
                    </button>
                   <br/>
                   <br/>
                   <br/>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
