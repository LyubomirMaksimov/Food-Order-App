import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [order, SetOrder] = useState(false);
  const {
    isLoading,
    error,
    finished,
    sendRequest: sendOrderRequest,
  } = useHttp();

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // cartCtx.addItem(item);
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price,
    });
  };

  const OrderHandler = () => {
    SetOrder(true);
  };

  const submitOrderHandler = (userDetails) => {
    sendOrderRequest(
      {
        url: "https://react-4013a-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user: userDetails,
          ordersItems: cartCtx.items,
        },
      },
      () => {}
    );

    cartCtx.clearCart();
    // if (finished) {
    //   cartCtx.clearCart();
    // }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const ButtonContent = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={OrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let CartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <Checkout
          onCancel={props.onClose}
          onSubmit={submitOrderHandler}
          isLoading={isLoading}
          error={error}
        />
      )}
      {!order && ButtonContent}
    </React.Fragment>
  );

  // if (order) {
  //   CartModalContent = <p>Sending Order</p>;
  // }

  if (finished) {
    CartModalContent = (
      <React.Fragment>
        <p>Successfuly Sended Order</p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  }

  return <Modal onClose={props.onClose}>{CartModalContent}</Modal>;
};

export default Cart;
