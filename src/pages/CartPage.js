import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { products } from "../data"; // استيراد البيانات من data.js
import "../styles/CartStyles.css";

const CartPage = () => {
  const [cart, setCart] = useCart();

  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total += item.price;
      return total;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const removeCartItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item.id === pid);
    if (index !== -1) {
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => {
                const product = products.find((prod) => prod.id === p.id);
                return (
                  <div className="row card flex-row" key={p.id}>
                    <div className="col-md-4">
                      <img
                        src={product?.image}
                        className="card-img-top"
                        alt={product?.name}
                        width="100%"
                        height={"130px"}
                      />
                    </div>
                    <div className="col-md-4">
                      <p>{product?.name}</p>
                      <p>{product?.description.substring(0, 30)}</p>
                      <p>Price: {product?.price}</p>
                    </div>
                    <div className="col-md-4 cart-remove-btn">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
