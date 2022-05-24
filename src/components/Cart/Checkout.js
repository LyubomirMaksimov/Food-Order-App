import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInput = useRef("");
  const streetInput = useRef("");
  const postalInput = useRef("");
  const cityInput = useRef("");

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const isEmpty = (value) => value.trim() === "";

  const ConfirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredCity = cityInput.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = !isEmpty(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    const OrderDetails = {
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    };

    props.onSubmit(OrderDetails);
    //Submit Valid data
  };

  let nameClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  let streetClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  let postalClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;
  let cityClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const buttonContent = (
    <div className={classes.actions}>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button className={classes.submit}> Confirm </button>
    </div>
  );

  return (
    <form onSubmit={ConfirmHandler}>
      <div className={nameClasses}>
        <label> You Name</label>
        <input type="text" id="name" ref={nameInput}></input>
        {!formInputsValidity.name && <p> Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label> Street</label>
        <input type="text" id="street" ref={streetInput}></input>
        {!formInputsValidity.street && <p> Please enter a valid street!</p>}
      </div>
      <div className={postalClasses}>
        <label> Postal Code</label>
        <input type="text" id="postal" ref={postalInput}></input>
        {!formInputsValidity.postal && <p> Please enter a valid postal!</p>}
      </div>
      <div className={cityClasses}>
        <label> City</label>
        <input type="text" id="city" ref={cityInput}></input>
        {!formInputsValidity.city && <p> Please enter a valid city!</p>}
      </div>
      {!props.isLoading && buttonContent}
      {props.isLoading && <p>Loading</p>}
      {props.error && <p>{props.error}</p>}
    </form>
  );
};

export default Checkout;
