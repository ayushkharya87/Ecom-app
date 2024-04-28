import { useEffect, useState } from "react";
import {VscError} from "react-icons/vsc"
import CartItem from "../components/CartItem";
import {Link} from "react-router-dom";


const cartItems = [
  {
    productId: "abc",
    photo: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
    name: "image",
    price: 3000,
    quantity: 2,
    stock: 10
  }
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18)
const shippingCharges = 200;
const discount = 400;
const total = subTotal + tax + shippingCharges;

const Cart = () => {

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5 ) setIsValidCouponCode(true);
      else setIsValidCouponCode(false)
    }, 1000);

    return () => {
      clearTimeout(timeOutID)
      setIsValidCouponCode(false)
    }
  }, [couponCode])

  return (
    <div className='cart'>
      {/* cart item */}
      <main>
        {
          cartItems.length > 0 ? (
          cartItems.map((i, index) => <CartItem key={index} cartItem={i}/>)
          ) : 
          <h2>No Items Added</h2>
        }
      </main>

      <aside>
        <p>Sub-total: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount} </em>
        </p>
        <p><b>Total: ₹{total}</b></p>

        {/* promo code input */}
        <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>

        {/* show coupon code valid or not */}
        {
          couponCode && (
            isValidcouponCode ? (
              <span className="green"> ₹{discount} off using the <code>{couponCode}</code> </span>
            ) :
            (
              <span className="red">Invalid Coupon <VscError /></span>
            )
          )
        }

        {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart