import { ChangeEvent, useState } from "react"
import {BiArrowBack} from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Shipping = () => {

    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const changeHandler = ( e: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}))
    }

  return (
    <div className="shipping">

        <button className="back-btn" onClick={() => navigate("/cart")}>
            <BiArrowBack />
        </button>

        {/* shiping form */}
        <form action="">
            <h1>Shipping Address</h1>
            {/* address */}
            <input required type="text" placeholder="address" name="address" value={shippingInfo.address} onChange={changeHandler}/>
            {/* city */}
            <input required type="text" placeholder="city" name="city" value={shippingInfo.city} onChange={changeHandler}/>
            {/* state */}
            <input required type="text" placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler}/>
            {/* country */}
            <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                <option value="">Choose Country</option>
                <option value="india">India</option>
            </select>
            {/* pincode */}
            <input required type="number" placeholder="Pincode" name="pincode" value={shippingInfo.pincode} onChange={changeHandler}/>

            <button type="submit">Pay Now</button>
        </form>
    </div>
  )
}

export default Shipping