import { useState } from "react";

import styles from "./PaymentModel.module.css";

import gpayQR from "../assets/GooglePay.jpeg";

const PaymentModal = ({
  show,
  onClose,
  grandTotal,
  onPaymentSuccess,
}) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [address, setAddress] = useState({

  fullName: user?.address?.fullName || "",

  phone: user?.address?.phone || "",

  street: user?.address?.street || "",

  area: user?.address?.area || "",

  city: user?.address?.city || "",

  state: user?.address?.state || "",

  pincode: user?.address?.pincode || ""

});

  const handleChange = (e) => {

  setAddress({

    ...address,

    [e.target.name]: e.target.value

  });
};

  const [showPaymentSection, setShowPaymentSection] = useState(false);

  if (!show) return null;

  const upiLink =
    `upi://pay?pa=mp9569270@oksbi&pn=Mithaas Sweet Shop&am=${grandTotal}&cu=INR`;

const handleContinue = () => {

  if (

    !address.fullName ||
    !address.phone ||
    !address.street ||
    !address.area ||
    !address.city ||
    !address.state ||
    !address.pincode

  ) {

    alert("Please fill all address fields");

    return;
  }

  const updatedUser = {

    ...user,

    address: address

  };

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setShowPaymentSection(true);
};

  return (

    <div className={styles.overlay}>

      <div className={styles.modal}>

        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className={styles.title}>
          Checkout
        </h2>

        {!showPaymentSection ? (

          <>
            <div className={styles.addressForm}>

  <input
    type="text"
    name="fullName"
    placeholder="Full Name"
    value={address.fullName}
    onChange={handleChange}
  />

  <input
    type="text"
    name="phone"
    placeholder="Phone Number"
    value={address.phone}
    onChange={handleChange}
  />

  <input
    type="text"
    name="street"
    placeholder="House No / Street"
    value={address.street}
    onChange={handleChange}
  />

  <input
    type="text"
    name="area"
    placeholder="Area / Landmark"
    value={address.area}
    onChange={handleChange}
  />

  <input
    type="text"
    name="city"
    placeholder="City"
    value={address.city}
    onChange={handleChange}
  />

  <input
    type="text"
    name="state"
    placeholder="State"
    value={address.state}
    onChange={handleChange}
  />

  <input
    type="text"
    name="pincode"
    placeholder="Pincode"
    value={address.pincode}
    onChange={handleChange}
  />

</div>

            <h3 className={styles.amount}>
              Grand Total: ₹{grandTotal}
            </h3>

            <button
              className={styles.continueBtn}
              onClick={handleContinue}
            >
              Continue To Payment
            </button>
          </>

        ) : (

          <>
            <img
              src={gpayQR}
              alt="QR"
              className={styles.qrImage}
            />

            <p className={styles.scanText}>
              Scan using Google Pay, PhonePe or Paytm
            </p>

            <h3 className={styles.amount}>
              Pay ₹{grandTotal}
            </h3>

            <a
              href={upiLink}
              className={styles.payBtn}
            >
              Pay Now
            </a>

            <button
              className={styles.successBtn}
              onClick={onPaymentSuccess}
            >
              Payment Done
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default PaymentModal;